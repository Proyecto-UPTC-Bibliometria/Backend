import path from "path";
import fs from "fs";
import chalk from "chalk";
import projectModel from "../../models/project.model.js";

export default async function seedProjects() {
  const dirName = "./src/data";
  const fileName = "projects.json";
  const fullPath = path.join(dirName, fileName);

  const proyectsData = JSON.parse(fs.readFileSync(fullPath, "utf-8"));

  try {
    await projectModel.deleteMany();
    await projectModel.insertMany(proyectsData);

    console.log(chalk.green("✓"), "Success seeding proyects data");
  } catch (error) {
    const typedError = error as Error;

    console.error(
      chalk.red("\n✕ Error seeding proyects collection:"),
      typedError
    );

    process.exit(1);
  }
}
