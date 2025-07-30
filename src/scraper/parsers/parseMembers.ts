import externalMemberData from "../../interfaces/auxiliars/externalMemberData.interface.js";
import Member from "../../interfaces/member.interface.js";

export default function parseMembers(
  rows: Element[],
  externalData: externalMemberData
): Member[] {
  const { group } = externalData;

  function getTextContent(element: Element, child: number): string {
    const text = element.querySelector(`td:nth-child(${child})`);

    if (!text) return "";

    return capitalize(
      text.textContent?.trim().toLowerCase().replace(/\s+/g, " ") || ""
    );
  }

  function getUrlText(element: Element, child: number, href?: boolean): string {
    const link = element.querySelector(`td:nth-child(${child}) a`);

    if (!link) return "";

    const text = href
      ? link.getAttribute("href") || ""
      : link.textContent || "";

    return capitalize(text?.trim().toLowerCase().replace(/\s+/g, " ") || "");
  }

  function capitalize(text: string): string {
    return text.replace(/(?:^|\s)(\p{L})/gu, (match, letter) =>
      match.replace(letter, letter.toUpperCase())
    );
  }

  return rows
    .filter((row) => {
      const name = getUrlText(row, 1);
      return name !== "";
    })
    .map((row) => {
      const name = getUrlText(row, 1);
      const cvUrl = getUrlText(row, 1, true);
      const dedicatedHours = parseInt(getTextContent(row, 3) || "0");
      const state =
        getTextContent(row, 4).split(" - ")[1] === "Actual"
          ? "Activo"
          : "Inactivo";

      const member: Member = {
        name,
        group: `GROUP_${group.replaceAll(" ", "_")}`,
        state,
        dedicatedHours,
        cvUrl,
      };

      return member;
    });
}
