import externalMemberData from "../../interfaces/auxiliars/externalMemberData.interface.js";
import Project from "../../interfaces/project.interface.js";

export default function parseProjects(
  rows: Element[],
  externalData: externalMemberData
): Project[] {
  const { groupName } = externalData;

  function getTextContent(element: Element): string {
    const text = element.querySelector(`td:nth-child(2)`);

    if (!text) return "";

    return text.textContent?.trim() || "";
  }

  function capitalize(text: string): string {
    return text.replace(/(?:^|\s)(\p{L})/gu, (match, letter) =>
      match.replace(letter, letter.toUpperCase())
    );
  }

  function getIsValidated(element: Element): boolean {
    const td = element.querySelector("td:nth-child(1)");
    if (!td) return false;

    const hasImage = td.querySelector("img") !== null;
    return hasImage;
  }

  function parseProjectText(text: string): Project {
    const cleanText = text
      .replace(/^[^\d]*\d+[^\w]*Investigación[^:]*:\s*/i, "")
      .trim();

    const nameMatch = cleanText.match(/^(.+?)\s+\d{4}\/\d/);
    const name = nameMatch ? capitalize(nameMatch[1].toLowerCase().trim()) : "";

    const startDateMatch = cleanText.match(/(\d{4})\/(\d)/);
    let startDate = new Date();

    if (startDateMatch) {
      const year = parseInt(startDateMatch[1]);
      const semester = parseInt(startDateMatch[2]);
      const month = semester === 1 ? 0 : 6;
      startDate = new Date(year, month, 1);
    }

    const dateRangeMatch = cleanText.match(/(\d{4}\/\d)\s*-\s*(.+?)$/);
    let endDate: Date | null = null;
    let status = "";

    if (dateRangeMatch) {
      const endPart = dateRangeMatch[2].trim();

      if (endPart.toLowerCase() === "actual") {
        status = "Actual";
        endDate = null;
      } else {
        const endDateMatch = endPart.match(/(\d{4})\/(\d)/);
        if (endDateMatch) {
          const year = parseInt(endDateMatch[1]);
          const semester = parseInt(endDateMatch[2]);
          const month = semester === 1 ? 5 : 11;
          const day = semester === 1 ? 30 : 31;
          endDate = new Date(year, month, day);
          status = "Finalizado";
        } else {
          status = endPart;
        }
      }
    }

    return {
      id: 0,
      isValidated: false,
      name,
      startDate,
      endDate,
      status,
      group: hexId(groupName, 8),
    };
  }

  function hashId(text: string): number {
    let hash = 5381;

    for (let i = 0; i < text.length; i++) {
      hash = (hash << 5) + hash + text.charCodeAt(i);
    }

    return Math.abs(hash);
  }

  function hexId(text: string, length: number) {
    const hash = hashId(text);
    const hexString = Math.abs(hash).toString(16);

    if (hexString.length > length) {
      return hexString.slice(-length);
    } else {
      return hexString.padStart(length, "0");
    }
  }

  return rows
    .filter((row) => {
      const content = getTextContent(row);
      const title = parseProjectText(getTextContent(row)).name;

      return content !== "" && title !== "";
    })
    .map((row) => {
      const project: Project = {
        ...parseProjectText(getTextContent(row)),
        isValidated: getIsValidated(row),
      };

      return project;
    });
}
