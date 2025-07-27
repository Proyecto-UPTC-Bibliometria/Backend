// TODO: Add error handling and logging

export default function parseInvestigationLines(rows: Element[]): string[] {
  function capitalize(text: string): string {
    return text.replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  return rows.slice(1).map((row) => {
    const investigationLines = [];
    const line =
      row
        .querySelector("td")
        ?.textContent?.trim()
        .toLowerCase()
        .slice(4)
        .trim() || "";

    investigationLines.push(capitalize(line));

    return investigationLines[0];
  });
}
