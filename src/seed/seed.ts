import mongoose from "mongoose";
import { envConfig } from "../config/env.config.js";
import seedGroups from "./handlers/groups.seed.js";
import chalk from "chalk";
import seedMembers from "./handlers/members.seed.js";
import seedArticles from "./handlers/articles.seed.js";
import seedBooks from "./handlers/books.seed.js";
import seedSoftwares from "./handlers/softwares.seed.js";
import seedProjects from "./handlers/projects.seed.js";

const uri = envConfig.mongo_uri;

async function seedDatabase() {
  console.clear();
  console.log(chalk.gray("\n◔ Seeding database...\n"));

  try {
    if (!uri) throw new Error("No databse URI found");

    await mongoose.connect(uri);

    await seedGroups();
    await seedMembers();
    await seedArticles();
    await seedBooks();
    await seedSoftwares();
    await seedProjects();

    console.log(chalk.green("\n✓ Database updated"));

    process.exit(0);
  } catch (error) {
    const typedError = error as Error;

    console.error(chalk.red("\n✕ Error seeding database:"), typedError);
    process.exit(1);
  }
}

seedDatabase();
