export default function getTextContent(element: Element | null): string {
  if (!element) return "";
  const text = element.textContent?.trim().toLowerCase() || "";

  return text.replace(/\s+/g, " ");
}
