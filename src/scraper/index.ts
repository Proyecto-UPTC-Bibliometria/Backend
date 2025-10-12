import chalk from "chalk";
import getGroupsData from "./extractors/getGroupsData.js";
import getMembers from "./extractors/getMembers.js";
import saveToJson from "./lib/saveToJson.js";
import getArticles from "./extractors/getArticles.js";
import getBooks from "./extractors/getBooks.js";
import getSoftwares from "./extractors/getSoftwares.js";

async function main() {
  console.clear();

  // const groups = await getGroupsData();
  // const members = await getMembers();
  // const articles = await getArticles();
  // const books = await getBooks();
  const softwares = await getSoftwares();

  try {
    const promises = [
      // saveToJson("groups.json", groups),
      // saveToJson("members.json", members),
      // saveToJson("articles.json", articles),
      // saveToJson("books.json", books),
      saveToJson("softwares.json", softwares),
    ];

    await Promise.all(promises);
    console.log(chalk.green("\n✓ All data saved in files"));
  } catch (error) {
    const typedError = error as Error;

    console.error(chalk.red("\n✕ Error saving data:"), typedError);
  }
}

main();
