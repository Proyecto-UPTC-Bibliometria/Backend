import Member from "../../interfaces/member.interface.js";
import launchBrowser from "../lib/launchBrowser.js";
import loadPage from "../lib/loadPage.js";
import getGroupsUrl from "./getGroupsUrl.js";
import GroupUrl from "../../interfaces/groupUrl.interface.js";
import parseMembers from "../parsers/parseMembers.js";
import batchProcessor from "../utils/batchProcessor.js";
import chalk from "chalk";

export default async function getMembers(): Promise<Member[] | undefined> {
  console.log(chalk.gray("◔ Processing members..."));

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

        const members = await tables[4].$$eval("tbody tr", parseMembers);

        return members;
      } catch (error) {
        const typedError = error as Error;

        console.error(
          chalk.red("\n✕ Error extracting members:"),
          typedError.message
        );
        return [];
      }
    };

    const membersData = await batchProcessor(groupsUrls, processMembers);

    console.log(
      chalk.green("\n✓"),
      "Processing completed. Total members found:",
      chalk.blue(membersData.length)
    );

    console.log(chalk.gray("▶ Total members expected:"), chalk.yellow(10437));

    return membersData;
  } catch (error) {
    const typedError = error as Error;

    console.error(
      chalk.red("\n✕ Error extracting members:"),
      typedError.message
    );
  } finally {
    await browser.close();
  }
}
