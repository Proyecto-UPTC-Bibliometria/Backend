import Member from "../../interfaces/member.interface";
import getTextContent from "../utils/getTextContent";

// TODO: Add error handling and logging

function extractMembers(row: Element): Member | undefined {
  const stateData = row.querySelector("td:nth-child(4)");
  const memberData = row.querySelector("td:nth-child(1)")?.querySelector("a");

  if (!memberData || !stateData) return;

  const name = getTextContent(memberData);
  const cvUrl = memberData.getAttribute("href")?.trim();

  const dedicatedHours = parseInt(
    row.querySelector("td:nth-child(3)")?.textContent?.trim() || "0"
  );

  const state = getState(getTextContent(stateData));

  if (!name || !state) return;

  return {
    name,
    state,
    dedicatedHours,
    cvUrl,
  } as Member;
}

function getState(stateText: string): "activo" | "inactivo" {
  return stateText.split(" - ")[1] === "Actual" ? "activo" : "inactivo";
}

export default function parseMembers(rows: Element[]): Member[] {
  return rows
    .slice(2)
    .map(extractMembers)
    .filter((member): member is Member => member !== undefined);
}
