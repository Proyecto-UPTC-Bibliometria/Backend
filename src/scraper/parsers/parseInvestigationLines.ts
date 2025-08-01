export default function parseInvestigationLines(rows: Element[]): string[] {
  function capitalize(text: string): string {
    return text.replace(/(?:^|\s)(\p{L})/gu, (match, letter) =>
      match.replace(letter, letter.toUpperCase())
    );
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
