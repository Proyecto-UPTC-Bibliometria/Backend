import getGroupsUrl from "./extractors/getGroupsUrl.js";
import getMembers from "./extractors/getMembers.js";

async function main() {
  const members = await getMembers();

  console.log("Members extracted:", members?.length);

  console.log("First member:", members?.[0]);

  console.log(members);
}

main();
