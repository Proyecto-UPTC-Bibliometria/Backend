import externalMemberData from "../../interfaces/auxiliars/externalMemberData.interface.js";
import Member from "../../interfaces/member.interface.js";

export default function parseMembers(
  rows: Element[],
  externalData: externalMemberData
): Member[] {
  const { groupName } = externalData;

  function getTextContent(element: Element, child: number): string {
    const text = element.querySelector(`td:nth-child(${child})`);

    if (!text) return "";

    return capitalize(
      text.textContent?.trim().toLowerCase().replace(/\s+/g, " ") || ""
    );
  }

  function getText(element: Element, child: number, href?: boolean): string {
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
      const name = getText(row, 1);
      return name !== "";
    })
    .map((row) => {
      const name = getText(row, 1);
      const cvUrl = getText(row, 1, true);
      const dedicatedHours = parseInt(getTextContent(row, 3) || "0");
      const state =
        getTextContent(row, 4).split(" - ")[1] === "Actual"
          ? "Activo"
          : "Inactivo";

      const member: Member = {
        id: 0,
        name,
        state,
        cvUrl,
        groups: [
          {
            groupId: hexId(groupName, 8),
            dedicatedHours,
          },
        ],
      };

      return member;
    });
}
