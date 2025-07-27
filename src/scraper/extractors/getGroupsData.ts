import Group from "../../interfaces/group.interface.js";
import GroupUrl from "../../interfaces/groupUrl.interface.js";
import launchBrowser from "../lib/launchBrowser.js";
import loadPage from "../lib/loadPage.js";
import parseGroupsData from "../parsers/parseGroupsData.js";
import parseInvestigationLines from "../parsers/parseInvestigationLines.js";
import parseStrategicPlan from "../parsers/parseStrategicPlan.js";
import getGroupsUrl from "./getGroupsUrl.js";

// TODO:

export default async function getGroupsData() {
  const browser = await launchBrowser();
  const groupsUrls = await getGroupsUrl();
  const groupsData: Group[] = [];
  const batchSize = 60;

  try {
    if (!groupsUrls || groupsUrls.length === 0) {
      throw new Error("No groups found");
    }

    const processGroup = async (group: GroupUrl): Promise<Group[]> => {
      try {
        if (!group.url) return [];

        const page = await loadPage(browser, group.url);
        const tables = await page.$$("table");

        if (tables.length < 5) return [];

        const strategicPlan = await tables[2].$$eval(
          "tbody tr:nth-child(2)",
          parseStrategicPlan
        );

        const investigationLines = await tables[3].$$eval(
          "tbody tr",
          parseInvestigationLines
        );

        const groupData = await tables[0].$$eval("tbody", parseGroupsData, {
          name: group.name,
          url: group.url,
          strategicPlan: strategicPlan,
          investigationLines: investigationLines,
        });

        return groupData;
      } catch (error) {
        const typedError = error as Error;

        console.error("Error extracting members:", typedError);
        return [];
      }
    };

    for (let i = 0; i < groupsUrls.length; i += batchSize) {
      const batch = groupsUrls.slice(i, i + batchSize);

      console.log(
        `Processing batch ${Math.floor(i / batchSize) + 1}: ${
          batch.length
        } groups`
      );

      const batchPromises = batch.map((group) =>
        processGroup(group as GroupUrl)
      );
      const batchResults = await Promise.all(batchPromises);

      batchResults.forEach((members) => {
        if (members && members.length > 0) {
          groupsData.push(...members);
        }
      });

      console.log(
        `Completed batch. Total members so far: ${groupsData.length}`
      );
    }

    console.log(
      `Processing completed. Total members found: ${groupsData.length}`
    );

    return groupsData;
  } catch (error) {
    const typedError = error as Error;

    console.error("Error extracting members:", typedError);
  } finally {
    await browser.close();
  }
}
