import Member from "../../interfaces/member.interface.js";
import launchBrowser from "../lib/launchBrowser.js";
import loadPage from "../lib/loadPage.js";
import getGroupsUrl from "./getGroupsUrl.js";
import GroupUrl from "../../interfaces/groupUrl.interface.js";
import capitalize from "../../utils/capitalize.js";
import parseMembers from "../parsers/parseMembers.js";

// TODO: Add logging
// FIXME: Handle errors properly

export default async function getMembers() {
  const browser = await launchBrowser();
  const groupsUrls = await getGroupsUrl();
  const allMembers: Member[] = [];

  try {
    if (!groupsUrls || groupsUrls.length === 0) {
      throw new Error("No groups found");
    }

    const processGrop = async (group: GroupUrl) => {
      try {
        if (!group.url) return [];

        const page = await loadPage(browser, group.url);
        const tables = await page.$$("table");

        if (tables.length < 5) return [];

        const membersTable = tables[4];
        const members = await membersTable.$$eval("tbody tr", parseMembers);

        if (!members || members.length === 0) {
          console.warn(`No members found for group: ${group.name}`);
          return [];
        }

        return members
          .filter((member): member is Member => member !== undefined)
          .map(
            (member): Member => ({ ...member, name: capitalize(member.name) })
          );
      } catch (error) {
        const typedError = error as Error;

        console.error("Error extracting members:", typedError);
        return [];
      }
    };

    const batchSize = 60;
    for (let i = 0; i < groupsUrls.length; i += batchSize) {
      const batch = groupsUrls.slice(i, i + batchSize);

      console.log(
        `Processing batch ${Math.floor(i / batchSize) + 1}: ${
          batch.length
        } groups`
      );

      const batchPromises = batch.map((group) =>
        processGrop(group as GroupUrl)
      );
      const batchResults = await Promise.all(batchPromises);

      batchResults.forEach((members) => {
        if (members && members.length > 0) {
          allMembers.push(...members);
        }
      });

      console.log(
        `Completed batch. Total members so far: ${allMembers.length}`
      );
    }

    console.log(
      `Processing completed. Total members found: ${allMembers.length}`
    );

    return allMembers;
  } catch (error) {
    const typedError = error as Error;

    console.error("Error extracting members:", typedError);
  } finally {
    await browser.close();
  }
}
