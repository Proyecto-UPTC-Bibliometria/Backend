import path from "path";
import fs from "fs";
import chalk from "chalk";
import articleModel from "../../models/article.model.js";

export default async function seedArticles() {
  const dirName = "./src/data";
  const fileName = "articles.json";
  const fullPath = path.join(dirName, fileName);

  const articlesData = JSON.parse(fs.readFileSync(fullPath, "utf-8"));

  try {
    await articleModel.deleteMany();
    await articleModel.insertMany(articlesData);

    console.log(chalk.green("✓"), "Success seeding articles data");
  } catch (error) {
    const typedError = error as Error;

    console.error(
      chalk.red("\n✕ Error seeding articles collection:"),
      typedError
    );

    process.exit(1);
  }
}
