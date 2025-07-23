import getGroupsUrl from "./extractors/getGroupsUrl.js";
import getMembers from "./extractors/getMembers.js";

async function main() {
  const members = await getMembers();

  console.log("Members extracted:", members?.length);

  console.log("First member:", members?.[0]);

  console.log(members);
}

main();

// const getGroupsUrl = await page.$$eval("#grupos .tbody tr", (results) =>
//   results.map((el) => {
//     const item = el.querySelector("td:nth-child(3)");
//     const groupUrl = item?.querySelector("a")?.getAttribute("href") ?? "";

//     return { groupUrl };
//   })
// );

// console.log(getGroupsUrl);
// await browser.close();

// import { chromium } from "playwright";
// import { envConfig } from "../config/env.config.js";

// const globalUrl =
//   "https://108.181.11.193/ciencia-war/busquedaGrupoXInstitucionGrupos.do?codInst=930&sglPais=&sgDepartamento=&maxRows=152&grupos_tr_=true&grupos_p_=1&grupos_mr_=152&__cpo=aHR0cHM6Ly9zY2llbnRpLm1pbmNpZW5jaWFzLmdvdi5jbw";

// // Lista de User Agents reales
// const userAgents = [
//   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
//   "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
//   "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0",
//   "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15",
// ];

// // Función para delay aleatorio
// const randomDelay = (min: number = 1000, max: number = 3000) => {
//   const delay = Math.floor(Math.random() * (max - min + 1)) + min;
//   return new Promise((resolve) => setTimeout(resolve, delay));
// };

// // Función para obtener User Agent aleatorio
// const getRandomUserAgent = () => {
//   return userAgents[Math.floor(Math.random() * userAgents.length)];
// };

// async function scrapWithAntiDetection() {
//   // Configuración del navegador con anti-detección
//   const browser = await chromium.launch({
//     headless: true,
//     args: [
//       "--no-sandbox",
//       "--disable-setuid-sandbox",
//       "--disable-dev-shm-usage",
//       "--disable-accelerated-2d-canvas",
//       "--no-first-run",
//       "--no-zygote",
//       "--disable-gpu",
//       "--disable-blink-features=AutomationControlled",
//       "--disable-features=VizDisplayCompositor",
//     ],
//   });

//   const page = await browser.newPage();

//   // Configurar User Agent aleatorio
//   await page.setExtraHTTPHeaders({
//     "User-Agent": getRandomUserAgent(),
//   });

//   // Configurar viewport aleatorio
//   const viewports = [
//     { width: 1366, height: 768 },
//     { width: 1920, height: 1080 },
//     { width: 1440, height: 900 },
//     { width: 1536, height: 864 },
//   ];

//   const randomViewport =
//     viewports[Math.floor(Math.random() * viewports.length)];
//   await page.setViewportSize(randomViewport);

//   // Configurar headers adicionales
//   await page.setExtraHTTPHeaders({
//     Accept:
//       "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
//     "Accept-Language": "en-US,en;q=0.5",
//     "Accept-Encoding": "gzip, deflate",
//     Connection: "keep-alive",
//     "Upgrade-Insecure-Requests": "1",
//   });

//   // Ocultar que es un navegador automatizado
//   await page.addInitScript(() => {
//     // Eliminar webdriver property
//     Object.defineProperty(navigator, "webdriver", {
//       get: () => undefined,
//     });

//     // Mock de plugins
//     Object.defineProperty(navigator, "plugins", {
//       get: () => [1, 2, 3, 4, 5],
//     });

//     // Mock de languages
//     Object.defineProperty(navigator, "languages", {
//       get: () => ["en-US", "en"],
//     });

//     // Mock de permissions
//     const originalQuery = window.navigator.permissions.query;
//     window.navigator.permissions.query = (
//       parameters
//     ): Promise<PermissionStatus> =>
//       parameters.name === "notifications"
//         ? (Promise.resolve({ state: "granted" }) as Promise<PermissionStatus>)
//         : originalQuery(parameters);
//   });

//   try {
//     console.log(`Intentando acceder a: ${globalUrl}`);

//     // Delay inicial aleatorio
//     await randomDelay(1000, 3000);

//     // Navegar a la página con timeout extendido
//     await page.goto(globalUrl, {
//       waitUntil: "domcontentloaded", // Cambiar a domcontentloaded para ser menos agresivo
//       timeout: 60000,
//     });

//     // Delay después de cargar
//     await randomDelay(2000, 5000);

//     // Simular comportamiento humano - scroll aleatorio
//     await page.evaluate(() => {
//       window.scrollTo(0, Math.floor(Math.random() * 500));
//     });

//     await randomDelay(1000, 2000);

//     // Esperar a que los elementos estén presentes
//     await page.waitForSelector("#grupos .tbody tr", { timeout: 60000 });

//     // Delay antes de extraer datos
//     await randomDelay(1000, 3000);

//     const getGroupsUrl = await page.$$eval("#grupos .tbody tr", (results) =>
//       results.map((el) => {
//         const item = el.querySelector("td:nth-child(3)");
//         const groupUrl = item?.querySelector("a")?.getAttribute("href") ?? "";
//         return { groupUrl };
//       })
//     );

//     console.log(`Encontrados ${getGroupsUrl.length} grupos:`, getGroupsUrl);

//     // Delay final antes de cerrar
//     await randomDelay(1000, 2000);

//     await browser.close();
//     return getGroupsUrl;
//   } catch (error) {
//     console.error("Error durante el scraping:", error);
//     await browser.close();
//     throw error;
//   }
// }

// // Función principal con reintentos
// async function scrapeWithRetries(maxRetries: number = 3) {
//   for (let attempt = 1; attempt <= maxRetries; attempt++) {
//     try {
//       console.log(`Intento ${attempt} de ${maxRetries}`);
//       const result = await scrapWithAntiDetection();
//       return result;
//     } catch (error) {
//       console.error(`Intento ${attempt} falló:`, error);

//       if (attempt === maxRetries) {
//         throw new Error(`Todos los intentos fallaron. Último error: ${error}`);
//       }

//       // Delay exponencial entre reintentos
//       const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
//       console.log(`Esperando ${delay}ms antes del siguiente intento...`);
//       await new Promise((resolve) => setTimeout(resolve, delay));
//     }
//   }
// }

// // Ejecutar el scraper
// scrapeWithRetries(3)
//   .then((results) => {
//     console.log("Scraping completado exitosamente", results);
//   })
//   .catch((error) => {
//     console.error("Scraping falló completamente:", error);
//   });
