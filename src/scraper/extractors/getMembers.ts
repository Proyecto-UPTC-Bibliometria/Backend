import Member from "../../interfaces/member.interface.js";
import launchBrowser from "../lib/launchBrowser.js";
import loadPage from "../lib/loadPage.js";
import getGroupsUrl from "./getGroupsUrl.js";
import GroupUrl from "../../interfaces/groupUrl.interface.js";
import parseMembers from "../parsers/parseMembers.js";
import batchProcessor from "../utils/batchProcessor.js";

// TODO: Add logging
// FIXME: Handle errors properly

export default async function getMembers(): Promise<Member[] | undefined> {
  const browser = await launchBrowser();
  const groupsUrls = await getGroupsUrl();

  try {
    if (!groupsUrls || groupsUrls.length === 0)
      throw new Error("No groups found");

    const processMembers = async (group: GroupUrl): Promise<Member[]> => {
      try {
        if (!group.url) throw new Error("No group url found");

        const page = await loadPage(browser, group.url);
        const tables = await page.$$("table");

        if (tables.length < 5) throw new Error("Not enough tables in the page");

        const members = await tables[4].$$eval("tbody tr", parseMembers);

        return members;
      } catch (error) {
        const typedError = error as Error;

        console.error("Error extracting members:", typedError);
        return [];
      }
    };

    const membersData = await batchProcessor(groupsUrls, processMembers);

    return membersData;
  } catch (error) {
    const typedError = error as Error;

    console.error("Error extracting members:", typedError);
  } finally {
    await browser.close();
  }
}
