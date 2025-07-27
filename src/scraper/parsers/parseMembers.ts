import Member from "../../interfaces/member.interface.js";

// TODO: Add error handling and logging
// TODO: Refactor -> Move the getTextContent function to a file

export default function parseMembers(rows: Element[]): Member[] {
  function getTextContent(element: Element): string {
    if (!element) return "";
    const text = element.textContent?.trim().toLowerCase() || "";

    return text.replace(/\s+/g, " ");
  }

  return rows
    .map((row) => {
      const stateData = row.querySelector("td:nth-child(4)");
      const memberData = row
        .querySelector("td:nth-child(1)")
        ?.querySelector("a");

      if (!memberData || !stateData) return;

      const name = getTextContent(memberData);
      const cvUrl = memberData.getAttribute("href")?.trim();

      const dedicatedHours = parseInt(
        row.querySelector("td:nth-child(3)")?.textContent?.trim() || "0"
      );

      const state =
        getTextContent(stateData).split(" - ")[1] === "Actual"
          ? "activo"
          : "inactivo";

      if (!name || !state) return;

      return {
        name,
        state,
        dedicatedHours,
        cvUrl,
      } as Member;
    })
    .filter((member): member is Member => member !== undefined);
}
