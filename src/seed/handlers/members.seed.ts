import path from "path";
import fs from "fs";
import chalk from "chalk";
import memberModel from "../../models/member.model.js";

export default async function seedMembers() {
  const dirName = "./src/data";
  const fileName = "members.json";
  const fullPath = path.join(dirName, fileName);

  const membersData = JSON.parse(fs.readFileSync(fullPath, "utf-8"));

  try {
    await memberModel.deleteMany();
    await memberModel.insertMany(membersData);

    console.log(chalk.green("✓"), "Success seeding members data");
  } catch (error) {
    const typedError = error as Error;

    console.error(
      chalk.red("\n✕ Error seeding members collection:"),
      typedError
    );

    process.exit(1);
  }
}
