import { Browser, chromium } from "playwright";

export default async function launchBrowser(): Promise<Browser> {
  return await chromium.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-web-security",
      "--disable-features=VizDisplayCompositor",
      "--disable-gpu",
      "--no-first-run",
      "--disable-default-apps",
      "--disable-sync",
      "--disable-translate",
      "--disable-extensions",
    ],
  });
}
