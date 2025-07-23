import launchBrowser from "../lib/launchBrowser.js";
import loadPage from "../lib/loadPage.js";
import { envConfig } from "../../config/env.config.js";
import parseGroupsUrl from "../parsers/parseGroupsUrl.js";

const globalUrl = envConfig.gruplac_url ?? "";

// TODO: Add logging
// FIXME: Handle errors properly

export default async function getGroupsUrl() {
  const browser = await launchBrowser();

  try {
    const page = await loadPage(browser, globalUrl);
    const table = await page.$$("#grupos");

    const getGroupsUrl = await table[0].$$eval(".tbody tr", parseGroupsUrl);

    return getGroupsUrl;
  } catch (error) {
    const typedError = error as Error;

    console.error("Error getting groups URL:", typedError);
  } finally {
    await browser.close();
  }
}
