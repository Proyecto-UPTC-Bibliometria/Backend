import chalk from "chalk";
import launchBrowser from "../lib/launchBrowser.js";
import getGroupsUrl from "./getGroupsUrl.js";
import loadPage from "../lib/loadPage.js";
import GroupUrl from "../../interfaces/groupUrl.interface.js";
import batchProcessor from "../utils/batchProcessor.js";
import capitalize from "../../utils/capitalize.js";
import Software from "../../interfaces/software.interface.js";
import parseSoftwares from "../parsers/parseSoftwares.js";

export default async function getSoftwares(): Promise<Software[] | undefined> {
  console.log(chalk.gray("\n◔ Processing softwares..."));

  const browser = await launchBrowser();
  const groupsUrls = await getGroupsUrl();

  try {
    if (!groupsUrls || groupsUrls.length === 0)
      throw new Error("No groups found");

    const processSoftwares = async (group: GroupUrl): Promise<Software[]> => {
      try {
        if (!group.url) throw new Error("No group url found");

        const page = await loadPage(browser, group.url);
        const tables = await page.$$("table");

        const softwares = await tables[48].$$eval("tbody tr", parseSoftwares, {
          groupName: capitalize(
            group.name
              .toLowerCase()
              .replaceAll("--", "-")
              .replaceAll(/\s+/g, " ") || ""
          ),
        });

        return softwares;
      } catch (error) {
        const typedError = error as Error;

        console.error(chalk.red("\n✕ Error extracting softwares:"), typedError);
        return [];
      }
    };

    const softwaresData = await batchProcessor(groupsUrls, processSoftwares);

    const softwaresWithId = softwaresData.map((article, index) => ({
      ...article,
      id: index + 1,
    }));

    console.log(
      chalk.green("\n✓"),
      "Processing completed. Total softwares found:",
      chalk.blue(softwaresWithId.length)
    );

    return softwaresWithId;
  } catch (error) {
    const typedError = error as Error;

    console.error(chalk.red("\n✕ Error extracting softwares:"), typedError);
  } finally {
    await browser.close();
  }
}
