import Member from "../../interfaces/member.interface.js";
import launchBrowser from "../lib/launchBrowser.js";
import loadPage from "../lib/loadPage.js";
import getGroupsUrl from "./getGroupsUrl.js";
import GroupUrl from "../../interfaces/groupUrl.interface.js";
import parseMembers from "../parsers/parseMembers.js";
import batchProcessor from "../utils/batchProcessor.js";
import chalk from "chalk";
import capitalize from "../../utils/capitalize.js";

export default async function getMembers(): Promise<Member[] | undefined> {
  console.log(chalk.gray("\n◔ Processing members..."));

  const browser = await launchBrowser();
  const groupsUrls = await getGroupsUrl();

  try {
    if (!groupsUrls || groupsUrls.length === 0)
      throw new Error("No groups found");

    const processMember = async (group: GroupUrl): Promise<Member[]> => {
      try {
        if (!group.url) throw new Error("No group url found");

        const page = await loadPage(browser, group.url);
        const tables = await page.$$("table");

        const members = await tables[4].$$eval("tbody tr", parseMembers, {
          group: capitalize(
            group.name.toLowerCase().replaceAll(/\s+/g, " ") || ""
          ),
        });

        return members;
      } catch (error) {
        const typedError = error as Error;

        console.error(chalk.red("\n✕ Error extracting members:"), typedError);
        return [];
      }
    };

    const membersData = await batchProcessor(groupsUrls, processMember);

    const membersWithId = membersData.map((member, index) => ({
      ...member,
      id: index + 1,
    }));

    console.log(
      chalk.green("\n✓"),
      "Processing completed. Total members found:",
      chalk.blue(membersWithId.length)
    );

    console.log(chalk.gray("▶ Total members expected:"), chalk.yellow(10437));

    return membersWithId;
  } catch (error) {
    const typedError = error as Error;

    console.error(chalk.red("\n✕ Error extracting members:"), typedError);
  } finally {
    await browser.close();
  }
}
