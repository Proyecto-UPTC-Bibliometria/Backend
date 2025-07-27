import Group from "../../interfaces/group.interface";
import GroupUrl from "../../interfaces/groupUrl.interface";
import Member from "../../interfaces/member.interface";

// FIXME: Fix logging messages

export default async function batchProcessor<T>(
  urls: GroupUrl[],
  process: (group: GroupUrl) => Promise<T[]>
) {
  const batchSize = 40;
  const data: T[] = [];

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);

    console.log(
      `Processing batch ${Math.floor(i / batchSize) + 1}: ${
        batch.length
      } groups`
    );

    const batchPromises = batch.map((group) => process(group as GroupUrl));
    const batchResults = await Promise.all(batchPromises);

    batchResults.forEach((items) => {
      if (items && items.length > 0) {
        data.push(...items);
      }
    });

    console.log(`Completed batch. Total members so far: ${data.length}`);
  }

  return data;
}
