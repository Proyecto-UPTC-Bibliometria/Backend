import chalk from "chalk";
import getGroupsData from "./extractors/getGroupsData.js";
import getGroupsUrl from "./extractors/getGroupsUrl.js";
import getMembers from "./extractors/getMembers.js";

async function main() {
  console.clear();

  await getGroupsData();
}

main();
