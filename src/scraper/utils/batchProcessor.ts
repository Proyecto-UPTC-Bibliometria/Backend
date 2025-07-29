import chalk from "chalk";
import GroupUrl from "../../interfaces/groupUrl.interface";

export default async function batchProcessor<T>(
  urls: GroupUrl[],
  process: (group: GroupUrl) => Promise<T[]>
) {
  const batchSize = 40;
  const data: T[] = [];

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);

    console.log(
      chalk.gray(`\n◔ Processing batch #${Math.floor(i / batchSize) + 1}`)
    );

    const batchPromises = batch.map((group) => process(group as GroupUrl));
    const batchResults = await Promise.all(batchPromises);

    batchResults.forEach((items) => {
      if (items && items.length > 0) {
        data.push(...items);
      }
    });

    console.log(
      chalk.green("✓"),
      chalk.gray("Completed batch. Items found:"),
      chalk.blue(data.length)
    );
  }

  return data;
}
