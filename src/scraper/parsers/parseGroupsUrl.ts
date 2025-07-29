import GroupUrl from "../../interfaces/groupUrl.interface.js";

export default function parseGroupsUrl(groups: Element[]): GroupUrl[] {
  return groups.map((el) => {
    const group = el.querySelector("td:nth-child(3)");

    const groupUrl = group?.querySelector("a")?.getAttribute("href");
    const groupName = group?.textContent?.trim();

    if (!groupUrl || !groupName) return { name: "", url: "" };

    return { name: groupName, url: groupUrl };
  });
}
