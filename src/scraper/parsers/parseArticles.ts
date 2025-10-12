import Article from "../../interfaces/article.interface.js";
import externalMemberData from "../../interfaces/auxiliars/externalMemberData.interface.js";

export default function parseArticles(
  rows: Element[],
  externalData: externalMemberData
): Article[] {
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

  function parseArticleText(text: string): Article {
    const cleanText = text
      .replace(/^\d+\.-\s*Publicado en revista especializada:\s*/i, "")
      .trim();

    const titleMatch = cleanText.match(
      /^(.+?)\s+(?=Colombia|Argentina|Mexico|México|España|Chile|Peru|Perú|Brasil|Estados Unidos|USA|United States)/i
    );
    const title = titleMatch ? titleMatch[1].trim() : "";

    const countryMatch = cleanText.match(
      /\b(Colombia|Argentina|Mexico|México|España|Chile|Peru|Perú|Brasil|Estados Unidos|USA|United States)\b/i
    );
    const country = countryMatch ? countryMatch[1] : "";

    const journalMatch = cleanText.match(
      /(?:Colombia|Argentina|Mexico|México|España|Chile|Peru|Perú|Brasil|Estados Unidos|USA|United States)[,\s]+(.+?)\s+ISSN/i
    );
    const journal = journalMatch
      ? journalMatch[1].replace(/^,\s*/, "").trim()
      : "";

    const issnMatch = cleanText.match(/ISSN:\s*([\d-]+)/i);
    const issn = issnMatch ? issnMatch[1] : "";

    const yearMatch = cleanText.match(/\b(20\d{2}|19\d{2})\b/);
    const year = yearMatch ? parseInt(yearMatch[1]) : 0;

    const volumeMatch = cleanText.match(/vol:?\s*(\d+|[IVX]+)/i);
    const volume = volumeMatch ? volumeMatch[1] : "";

    const issueMatch = cleanText.match(/fasc:?\s*([^\s]+)/i);
    let issue = "";
    if (issueMatch && issueMatch[1]) {
      const issueValue = issueMatch[1].trim();

      if (
        issueValue !== "N/A" &&
        issueValue !== "n/a" &&
        issueValue !== "-" &&
        issueValue !== "págs:"
      ) {
        issue = issueValue;
      }
    }

    const pagesMatch = cleanText.match(/págs?:?\s*([^,]+?)(?=,|\s+DOI|$)/i);
    let pages = "";
    if (pagesMatch && pagesMatch[1]) {
      const pagesValue = pagesMatch[1].trim();

      if (
        pagesValue &&
        pagesValue !== "-" &&
        pagesValue !== "N/A" &&
        pagesValue !== "n/a" &&
        !pagesValue.match(/^[\s-]+$/)
      ) {
        pages = pagesValue;
      }
    }

    const doiMatch = cleanText.match(/DOI:\s*([\d.\/a-z\-]+)/i);
    const doi = doiMatch ? doiMatch[1] : "";

    const authorsMatch = cleanText.match(/Autores?:\s*(.+?)$/i);
    let authors: string[] = [];

    if (authorsMatch) {
      authors = authorsMatch[1]
        .split(",")
        .filter((author) => author.trim().length > 0)
        .map((author) => capitalize(author.trim()));
    }

    return {
      id: 0,
      isValidated: false,
      title,
      country,
      journal,
      issn,
      year,
      volume,
      issue,
      pages,
      doi,
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
      const title = parseArticleText(getTextContent(row)).title;

      return content !== "" && title !== "";
    })
    .map((row) => {
      const article: Article = {
        ...parseArticleText(getTextContent(row)),
        isValidated: getIsValidated(row),
      };

      return article;
    });
}
