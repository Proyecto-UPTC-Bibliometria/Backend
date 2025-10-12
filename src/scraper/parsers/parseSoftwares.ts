import externalMemberData from "../../interfaces/auxiliars/externalMemberData.interface.js";
import Software from "../../interfaces/software.interface.js";

export default function parseSoftwares(
  rows: Element[],
  externalData: externalMemberData
): Software[] {
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

  function parseSoftwareText(text: string): Software {
    const cleanText = text
      .replace(/^\d+\.-\s*Computacional\s*:\s*/i, "")
      .trim();

    const type = "Computacional";

    const nameMatch = cleanText.match(
      /^(.+?)\s+(?=Colombia|Argentina|Mexico|México|España|Chile|Peru|Perú|Brasil|Estados Unidos|USA|United States)/i
    );
    const name = nameMatch ? capitalize(nameMatch[1].toLowerCase().trim()) : "";

    const countryMatch = cleanText.match(
      /\b(Colombia|Argentina|Mexico|México|España|Chile|Peru|Perú|Brasil|Estados Unidos|USA|United States)\b/i
    );
    const country = countryMatch ? countryMatch[1] : "";

    const yearMatch = cleanText.match(/\b(20\d{2}|19\d{2})\b/);
    const year = yearMatch ? parseInt(yearMatch[1]) : 0;

    const tradeNameMatch = cleanText.match(
      /Nombre comercial:\s*([^,]*?)(?=,|\s*Nombre del proyecto:|$)/i
    );
    const tradeName = tradeNameMatch
      ? capitalize(tradeNameMatch[1].toLowerCase().trim())
      : "";

    const projectNameMatch = cleanText.match(
      /Nombre del proyecto:\s*([^,]*?)(?=,|\s*Institución financiadora:|$)/i
    );
    const projectName = projectNameMatch
      ? capitalize(projectNameMatch[1].toLowerCase().trim())
      : "";

    const fundingMatch = cleanText.match(
      /Institución financiadora:\s*([^,]*?)(?=\s*Autores?:|$)/i
    );
    const fundingInstitution = fundingMatch
      ? capitalize(fundingMatch[1].toLowerCase().trim())
      : "";

    const authorsMatch = cleanText.match(/Autores?:\s*(.+?)$/i);
    let authors: string[] = [];

    if (authorsMatch) {
      authors = authorsMatch[1]
        .split(",")
        .filter((author) => author.trim().length > 0)
        .map((author) => capitalize(author.toLowerCase().trim()));
    }

    return {
      id: 0,
      isValidated: false,
      type,
      name,
      country,
      year,
      tradeName,
      projectName,
      fundingInstitution,
      authors,
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
      const title = parseSoftwareText(getTextContent(row)).name;

      return content !== "" && title !== "";
    })
    .map((row) => {
      const software: Software = {
        ...parseSoftwareText(getTextContent(row)),
        isValidated: getIsValidated(row),
      };

      return software;
    });
}
