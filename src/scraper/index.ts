import getGroupsData from "./extractors/getGroupsData.js";
import getGroupsUrl from "./extractors/getGroupsUrl.js";
import getMembers from "./extractors/getMembers.js";

async function main() {
  const groups = await getGroupsData();

  console.log("Groups extracted:", groups?.length);

  console.log("First Group:", groups?.[0]);

  console.log(groups);
}

main();
