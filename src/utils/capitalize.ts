export default function capitalize(text: string): string {
  return text.replace(/\b\w/g, (letter) => letter.toUpperCase());
}
