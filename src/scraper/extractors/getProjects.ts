import chalk from "chalk";
import launchBrowser from "../lib/launchBrowser.js";
import getGroupsUrl from "./getGroupsUrl.js";
import loadPage from "../lib/loadPage.js";
import GroupUrl from "../../interfaces/groupUrl.interface.js";
import batchProcessor from "../utils/batchProcessor.js";
import capitalize from "../../utils/capitalize.js";
import Project from "../../interfaces/project.interface.js";
import parseProjects from "../parsers/parseProjects.js";

export default async function getProjects(): Promise<Project[] | undefined> {
  console.log(chalk.gray("\n◔ Processing projects..."));

  const browser = await launchBrowser();
  const groupsUrls = await getGroupsUrl();

  try {
    if (!groupsUrls || groupsUrls.length === 0)
      throw new Error("No groups found");

    const processProjects = async (group: GroupUrl): Promise<Project[]> => {
      try {
        if (!group.url) throw new Error("No group url found");

        const page = await loadPage(browser, group.url);
        const tables = await page.$$("table");

        const projects = await tables[84].$$eval("tbody tr", parseProjects, {
          groupName: capitalize(
            group.name
              .toLowerCase()
              .replaceAll("--", "-")
              .replaceAll(/\s+/g, " ") || ""
          ),
        });

        return projects;
      } catch (error) {
        const typedError = error as Error;

        console.error(chalk.red("\n✕ Error extracting projects:"), typedError);
        return [];
      }
    };

    const projectsData = await batchProcessor(groupsUrls, processProjects);

    const projectsWithId = projectsData.map((project, index) => ({
      ...project,
      id: index + 1,
    }));

    console.log(
      chalk.green("\n✓"),
      "Processing completed. Total projects found:",
      chalk.blue(projectsWithId.length)
    );

    return projectsWithId;
  } catch (error) {
    const typedError = error as Error;

    console.error(chalk.red("\n✕ Error extracting projects:"), typedError);
  } finally {
    await browser.close();
  }
}
