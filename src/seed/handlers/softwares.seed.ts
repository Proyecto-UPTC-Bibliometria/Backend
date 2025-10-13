import path from "path";
import fs from "fs";
import chalk from "chalk";
import softwareModel from "../../models/software.model.js";

export default async function seedSoftwares() {
  const dirName = "./src/data";
  const fileName = "softwares.json";
  const fullPath = path.join(dirName, fileName);

  const softwaresData = JSON.parse(fs.readFileSync(fullPath, "utf-8"));

  try {
    await softwareModel.deleteMany();
    await softwareModel.insertMany(softwaresData);

    console.log(chalk.green("✓"), "Success seeding softwares data");
  } catch (error) {
    const typedError = error as Error;

    console.error(
      chalk.red("\n✕ Error seeding softwares collection:"),
      typedError
    );

    process.exit(1);
  }
}
