import path from "path";
import fs from "fs";
import chalk from "chalk";
import bookModel from "../../models/book.model.js";

export default async function seedBooks() {
  const dirName = "./src/data";
  const fileName = "books.json";
  const fullPath = path.join(dirName, fileName);

  const booksData = JSON.parse(fs.readFileSync(fullPath, "utf-8"));

  try {
    await bookModel.deleteMany();
    await bookModel.insertMany(booksData);

    console.log(chalk.green("✓"), "Success seeding books data");
  } catch (error) {
    const typedError = error as Error;

    console.error(chalk.red("\n✕ Error seeding books collection:"), typedError);

    process.exit(1);
  }
}
