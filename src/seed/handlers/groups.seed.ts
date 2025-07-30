import path from "path";
import groupModel from "../../models/group.model.js";
import fs from "fs";
import chalk from "chalk";

export default async function seedGroups() {
  const dirName = "./src/data";
  const fileName = "groups.json";
  const fullPath = path.join(dirName, fileName);

  const groupsData = JSON.parse(fs.readFileSync(fullPath, "utf-8"));

  try {
    await groupModel.deleteMany();
    await groupModel.insertMany(groupsData);

    console.log(chalk.green("✓"), "Success seeding groups data");
  } catch (error) {
    const typedError = error as Error;

    console.error(
      chalk.red("\n✕ Error seeding groups collection:"),
      typedError
    );

    process.exit(1);
  }
}
