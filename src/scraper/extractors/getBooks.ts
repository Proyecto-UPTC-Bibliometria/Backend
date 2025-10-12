import chalk from "chalk";
import launchBrowser from "../lib/launchBrowser.js";
import getGroupsUrl from "./getGroupsUrl.js";
import loadPage from "../lib/loadPage.js";
import GroupUrl from "../../interfaces/groupUrl.interface.js";
import batchProcessor from "../utils/batchProcessor.js";
import capitalize from "../../utils/capitalize.js";
import Book from "../../interfaces/book.interface.js";
import parseBooks from "../parsers/parseBooks.js";

export default async function getBooks(): Promise<Book[] | undefined> {
  console.log(chalk.gray("\n◔ Processing books..."));

  const browser = await launchBrowser();
  const groupsUrls = await getGroupsUrl();

  try {
    if (!groupsUrls || groupsUrls.length === 0)
      throw new Error("No groups found");

    const processBooks = async (group: GroupUrl): Promise<Book[]> => {
      try {
        if (!group.url) throw new Error("No group url found");

        const page = await loadPage(browser, group.url);
        const tables = await page.$$("table");

        const books = await tables[14].$$eval("tbody tr", parseBooks, {
          groupName: capitalize(
            group.name
              .toLowerCase()
              .replaceAll("--", "-")
              .replaceAll(/\s+/g, " ") || ""
          ),
        });

        return books;
      } catch (error) {
        const typedError = error as Error;

        console.error(chalk.red("\n✕ Error extracting books:"), typedError);
        return [];
      }
    };

    const booksData = await batchProcessor(groupsUrls, processBooks);

    const booksWithId = booksData.map((book, index) => ({
      ...book,
      id: index + 1,
    }));

    console.log(
      chalk.green("\n✓"),
      "Processing completed. Total books found:",
      chalk.blue(booksWithId.length)
    );

    return booksWithId;
  } catch (error) {
    const typedError = error as Error;

    console.error(chalk.red("\n✕ Error extracting books:"), typedError);
  } finally {
    await browser.close();
  }
}
