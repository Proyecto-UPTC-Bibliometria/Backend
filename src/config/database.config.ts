import mongoose from "mongoose";
import { envConfig } from "./env.config.js";
import chalk from "chalk";

const uri = envConfig.mongo_uri;

export default async function connect() {
  try {
    if (!uri) throw new Error("Cannot connect to databse, no uri found");

    await mongoose.connect(uri);

    console.log(chalk.green("✓"), "Succesfully connected to database.\n");
  } catch (error) {
    const typedError = error as Error;

    console.error(chalk.red("✕ Error connecting to database", typedError));
    console.log(chalk.gray("\n◔ Reconecting..."));

    setTimeout(() => {
      connect();
    }, 5000);
  }
}
