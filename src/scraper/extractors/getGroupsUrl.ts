import launchBrowser from "../lib/launchBrowser.js";
import loadPage from "../lib/loadPage.js";
import { envConfig } from "../../config/env.config.js";
import parseGroupsUrl from "../parsers/parseGroupsUrl.js";
import chalk from "chalk";

const globalUrl = envConfig.gruplac_url;

export default async function getGroupsUrl() {
  const browser = await launchBrowser();

  try {
    if (!globalUrl) throw new Error("No url found");

    const page = await loadPage(browser, globalUrl);
    const table = await page.$$("#grupos");

    const getGroupsUrl = await table[0].$$eval(".tbody tr", parseGroupsUrl);

    return getGroupsUrl;
  } catch (error) {
    const typedError = error as Error;

    console.error(chalk.red("\n✕ Error getting groups URL:"), typedError);
  } finally {
    await browser.close();
  }
}
