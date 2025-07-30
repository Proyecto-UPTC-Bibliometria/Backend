import ExternalGroupData from "../../interfaces/auxiliars/externalGroupData.interface";
import Group from "../../interfaces/group.interface";

export default function parseGroupsData(
  columns: Element[],
  externalData: ExternalGroupData
) {
  const { name, url, strategicPlan, investigationLines } = externalData;

  function getTextContent(element: Element, child: number): string {
    const text = element.querySelector(
      `tr:nth-child(${child}) td:nth-child(2)`
    );

    if (!text) return "";

    return capitalize(
      text.textContent?.trim().toLowerCase().replace(/\s+/g, " ") || ""
    );
  }

  function getUrlText(element: Element, child: number, href?: boolean): string {
    const link = element.querySelector(
      `tr:nth-child(${child}) td:nth-child(2) a`
    );

    if (!link) return "";

    const text = href
      ? link.getAttribute("href") || ""
      : link.textContent || "";

    return text?.trim().toLowerCase().replace(/\s+/g, " ") || "";
  }

  function capitalize(text: string): string {
    return text.replace(/(?:^|\s)(\p{L})/gu, (match, letter) =>
      match.replace(letter, letter.toUpperCase())
    );
  }

  return columns.map((column) => {
    const dateText = getTextContent(column, 2);
    const formationDate = new Date(dateText.replaceAll(" ", ""));
    const department = getTextContent(column, 3).split(" - ")[0];
    const city = getTextContent(column, 3).split(" - ")[1];
    const leader = getTextContent(column, 4);
    const isCertified = getTextContent(column, 5).slice(0, 2) === "si";
    const website = getUrlText(column, 6, true);
    const email = getUrlText(column, 7);
    const ranking = getTextContent(column, 8).slice(0, 1).toUpperCase();
    const knowledgeArea = getTextContent(column, 9);
    const mainScienceProgram = getTextContent(column, 10);
    const secondaryScienceProgram = getTextContent(column, 11);
    const location = {
      department,
      city,
    };

    const group: Group = {
      name: name,
      groupId: `GROUP_${name.toUpperCase().replaceAll(" ", "_")}`,
      formationDate,
      location,
      leader,
      isCertified,
      website: website === "null" ? "" : website,
      url: url,
      email,
      ranking,
      knowledgeArea,
      mainScienceProgram,
      secondaryScienceProgram,
      strategicPlan: strategicPlan,
      investigationLines: investigationLines,
    };

    return group;
  });
}
