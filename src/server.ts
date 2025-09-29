import chalk from "chalk";
import app from "./app.js";
import connect from "./config/database.config.js";
import { envConfig } from "./config/env.config.js";

const port = envConfig.port || 4000;

async function startServer() {
  try {
    console.clear();

    app.listen(port);

    console.log(
      chalk.green("✓"),
      "Server is running on port:",
      chalk.blue.underline(port)
    );
  } catch (error) {
    const typedError = error as Error;

    console.error(chalk.red("\n✕ Error starting server:"), typedError);
    process.exit(1);
  }
}

startServer();
connect();
