import chalk from "chalk";
import getGroupsData from "./extractors/getGroupsData.js";
import getMembers from "./extractors/getMembers.js";
import saveToJson from "./lib/saveToJson.js";

async function main() {
  console.clear();

  const groups = await getGroupsData();
  const members = await getMembers();

  try {
    const promises = [
      saveToJson("groups.json", groups),
      saveToJson("members.json", members),
    ];

    await Promise.all(promises);
    console.log(chalk.green("\n✓ All data saved in files"));
  } catch (error) {
    const typedError = error as Error;

    console.error(chalk.red("\n✕ Error saving data:"), typedError);
  }
}

main();
