import { Browser, Page } from "playwright";

const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
];

const viewports = [
  { width: 1920, height: 1080 },
  { width: 1366, height: 768 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
];

export default async function loadPage(
  browser: Browser,
  url: string
): Promise<Page> {
  let lastError;

  for (let attempt = 1; attempt <= 3; attempt++) {
    const context = await browser.newContext({
      userAgent: userAgents[Math.floor(Math.random() * userAgents.length)],
    });

    const page = await context.newPage();
    await page.setViewportSize(
      viewports[Math.floor(Math.random() * viewports.length)]
    );

    try {
      await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });

      return page;
    } catch (error) {
      lastError = error;

      await page.close();
      await context.close();

      if (attempt < 3) {
        await new Promise((resolve) => setTimeout(resolve, 500 * attempt));
      }
    }
  }

  throw lastError;
}
