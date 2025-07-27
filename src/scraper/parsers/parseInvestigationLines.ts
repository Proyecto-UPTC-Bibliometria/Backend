export default function parseInvestigationLines(rows: Element[]): string[] {
  return rows.slice(1).map((row) => {
    const investigationLines = [];
    const line =
      row
        .querySelector("td")
        ?.textContent?.trim()
        .toLowerCase()
        .slice(4)
        .trim() || "";

    investigationLines.push(line);

    return investigationLines[0];
  });
}
