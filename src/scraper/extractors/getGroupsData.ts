import chalk from "chalk";
import Group from "../../interfaces/group.interface.js";
import GroupUrl from "../../interfaces/groupUrl.interface.js";
import capitalize from "../../utils/capitalize.js";
import launchBrowser from "../lib/launchBrowser.js";
import loadPage from "../lib/loadPage.js";
import parseGroupsData from "../parsers/parseGroupsData.js";
import parseInvestigationLines from "../parsers/parseInvestigationLines.js";
import parseStrategicPlan from "../parsers/parseStrategicPlan.js";
import batchProcessor from "../utils/batchProcessor.js";
import getGroupsUrl from "./getGroupsUrl.js";

export default async function getGroupsData(): Promise<Group[] | undefined> {
  console.log(chalk.gray("◔ Processing groups..."));

  const browser = await launchBrowser();
  const groupsUrls = await getGroupsUrl();

  try {
    if (!groupsUrls || groupsUrls.length === 0)
      throw new Error("No groups found");

    const processGroup = async (group: GroupUrl): Promise<Group[]> => {
      try {
        if (!group.url) throw new Error("No group url found");

        const page = await loadPage(browser, group.url);
        const tables = await page.$$("table");

        const strategicPlan = await tables[2].$$eval(
          "tbody tr:nth-child(2)",
          parseStrategicPlan
        );

        const investigationLines = await tables[3].$$eval(
          "tbody tr",
          parseInvestigationLines
        );

        const groupData = await tables[0].$$eval("tbody", parseGroupsData, {
          name: capitalize(group.name.toLowerCase()),
          url: group.url,
          strategicPlan: strategicPlan,
          investigationLines: investigationLines,
        });

        return groupData;
      } catch (error) {
        const typedError = error as Error;

        console.error(
          chalk.red("\n✕ Error extracting groups:"),
          typedError.message
        );
        return [];
      }
    };

    const groupsData = await batchProcessor(groupsUrls, processGroup);

    console.log(
      chalk.green("\n✓"),
      "Processing completed. Total groups found:",
      chalk.blue(groupsData.length)
    );

    console.log(chalk.gray("▶ Total groups expected:"), chalk.yellow(152));

    return groupsData;
  } catch (error) {
    const typedError = error as Error;

    console.error(
      chalk.red("\n✕ Error extracting groups:"),
      typedError.message
    );
  } finally {
    await browser.close();
  }
}
