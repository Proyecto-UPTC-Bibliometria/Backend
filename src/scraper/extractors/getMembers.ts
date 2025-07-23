import Member from "../../interfaces/member.interface.js";
// import capitalize from "../../utils/capitalize.js";
import launchBrowser from "../lib/launchBrowser.js";
import loadPage from "../lib/loadPage.js";
import getGroupsUrl from "./getGroupsUrl.js";
import GroupUrl from "../../interfaces/groupUrl.interface.js";

export default async function getMembers() {
  const browser = await launchBrowser();
  const groups = await getGroupsUrl();
  const allMembers: Member[] = [];

  try {
    if (!groups || groups.length === 0) {
      throw new Error("No groups found");
    }

    const processGrop = async (group: GroupUrl) => {
      try {
        if (!group.url) return [];

        const page = await loadPage(browser, group.url);
        const tables = await page.$$("table");
        const membersTable = tables[4];

        if (tables.length < 5) return [];

        const members = await membersTable.$$eval("tbody tr", (rows) =>
          rows.slice(2).map((row) => {
            const stateData = row.querySelector("td:nth-child(4)");
            const memberData = row
              .querySelector("td:nth-child(1)")
              ?.querySelector("a");

            if (!memberData || !stateData) return;

            const name = memberData.textContent?.trim().toLowerCase();
            const cvUrl = memberData.getAttribute("href")?.trim();

            const dedicatedHours = parseInt(
              row.querySelector("td:nth-child(3)")?.textContent?.trim() || "0"
            );

            const state =
              stateData.textContent?.trim().split(" - ")[1] === "Actual"
                ? "activo"
                : "inactivo";

            if (!name || !state) return;

            const member: Member = {
              name,
              state,
              dedicatedHours,
              cvUrl,
            };

            return member;
          })
        );

        if (!members || members.length === 0) {
          console.warn(`No members found for group: ${group.name}`);
          return [];
        }

        return members.filter(
          (member): member is Member => member !== undefined
        );
      } catch (error) {
        const typedError = error as Error;

        console.error("Error extracting members:", typedError);
        return [];
      }
    };

    const batchSize = 60;
    for (let i = 0; i < groups.length; i += batchSize) {
      const batch = groups.slice(i, i + batchSize);

      console.log(
        `Processing batch ${Math.floor(i / batchSize) + 1}: ${
          batch.length
        } groups`
      );

      const batchPromises = batch.map((group) =>
        processGrop(group as GroupUrl)
      );
      const batchResults = await Promise.all(batchPromises);

      batchResults.forEach((members) => {
        if (members && members.length > 0) {
          allMembers.push(...members);
        }
      });

      console.log(
        `Completed batch. Total members so far: ${allMembers.length}`
      );
    }

    console.log(
      `Processing completed. Total members found: ${allMembers.length}`
    );
    return allMembers;
  } catch (error) {
    const typedError = error as Error;

    console.error("Error extracting members:", typedError);
  } finally {
    await browser.close();
  }
}
