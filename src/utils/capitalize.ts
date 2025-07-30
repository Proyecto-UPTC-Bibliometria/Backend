export default function capitalize(text: string): string {
  return text.replace(/(?:^|\s)(\p{L})/gu, (match, letter) =>
    match.replace(letter, letter.toUpperCase())
  );
}
