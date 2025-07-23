import Group from "../../interfaces/group.interface";
import GroupUrl from "../../interfaces/groupUrl.interface";
import launchBrowser from "../lib/launchBrowser";
import loadPage from "../lib/loadPage";
import getGroupsUrl from "./getGroupsUrl";

export default async function getGroupsData() {
  const browser = await launchBrowser();
  const groupsUrls = await getGroupsUrl();
  const groupsData: Group[] = [];

  try {
    if (!groupsUrls || groupsUrls.length === 0) {
      throw new Error("No groups found");
    }

    const processGrop = async (group: GroupUrl) => {
      try {
        if (!group.url) return [];

        const page = await loadPage(browser, group.url);
        const tables = await page.$$("table");

        if (tables.length < 5) return [];

        const basicData = tables[0];
        const stragicPlan = tables[2];
        const investigationLines = tables[3];

        const getBasicData = basicData.$$eval("tbody", (columns) =>
          columns.map((column) => {
            const formationDate = column
              .querySelector("tr:nth-child(2) td:nth-child(2)")
              ?.textContent?.trim();

            const department = column
              .querySelector("tr:nth-child(3) td:nth-child(2)")
              ?.textContent?.trim()
              .toLowerCase()
              .split(" - ")[0];
            const city = column
              .querySelector("tr:nth-child(3) td:nth-child(2)")
              ?.textContent?.trim()
              .toLowerCase()
              .split(" - ")[1];

            const leader = column
              .querySelector("tr:nth-child(4) td:nth-child(2)")
              ?.textContent?.trim();

            const isCertified = column
              .querySelector("tr:nth-child(5) td:nth-child(2)")
              ?.textContent?.trim();
          })
        );
      } catch (error) {
        const typedError = error as Error;

        console.error("Error extracting members:", typedError);
        return [];
      }
    };
  } catch (error) {}
}
