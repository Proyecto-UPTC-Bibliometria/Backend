import launchBrowser from "../lib/launchBrowser.js";
import loadPage from "../lib/loadPage.js";
import { envConfig } from "../../config/env.config.js";

const globalUrl = envConfig.gruplac_url ?? "";

export default async function getGroupsUrl() {
  const browser = await launchBrowser();

  try {
    const page = await loadPage(browser, globalUrl);
    const table = await page.$$("#grupos");

    const getGroupsUrl = await table[0].$$eval(".tbody tr", (results) =>
      results.map((el) => {
        const group = el.querySelector("td:nth-child(3)");

        const groupUrl = group?.querySelector("a")?.getAttribute("href");
        const groupName = group?.textContent?.trim();

        return { name: groupName, url: groupUrl };
      })
    );

    return getGroupsUrl;
  } catch (error) {
    const typedError = error as Error;

    console.error("Error getting groups URL:", typedError);
  } finally {
    await browser.close();
  }
}
