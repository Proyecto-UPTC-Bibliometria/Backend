import chalk from "chalk";
import launchBrowser from "../lib/launchBrowser.js";
import getGroupsUrl from "./getGroupsUrl.js";
import loadPage from "../lib/loadPage.js";
import GroupUrl from "../../interfaces/groupUrl.interface.js";
import Article from "../../interfaces/article.interface.js";
import batchProcessor from "../utils/batchProcessor.js";
import parseArticles from "../parsers/parseArticles.js";
import capitalize from "../../utils/capitalize.js";

export default async function getArticles(): Promise<Article[] | undefined> {
  console.log(chalk.gray("\n◔ Processing articles..."));

  const browser = await launchBrowser();
  const groupsUrls = await getGroupsUrl();

  try {
    if (!groupsUrls || groupsUrls.length === 0)
      throw new Error("No groups found");

    const processArticles = async (group: GroupUrl): Promise<Article[]> => {
      try {
        if (!group.url) throw new Error("No group url found");

        const page = await loadPage(browser, group.url);
        const tables = await page.$$("table");

        const articles = await tables[13].$$eval("tbody tr", parseArticles, {
          groupName: capitalize(
            group.name
              .toLowerCase()
              .replaceAll("--", "-")
              .replaceAll(/\s+/g, " ") || ""
          ),
        });

        return articles;
      } catch (error) {
        const typedError = error as Error;

        console.error(chalk.red("\n✕ Error extracting groups:"), typedError);
        return [];
      }
    };

    const articlesData = await batchProcessor(groupsUrls, processArticles);

    const articlesWithId = articlesData.map((article, index) => ({
      ...article,
      id: index + 1,
    }));

    console.log(
      chalk.green("\n✓"),
      "Processing completed. Total articles found:",
      chalk.blue(articlesWithId.length)
    );

    return articlesWithId;
  } catch (error) {
    const typedError = error as Error;

    console.error(chalk.red("\n✕ Error extracting groups:"), typedError);
  } finally {
    await browser.close();
  }
}
