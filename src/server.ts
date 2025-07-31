import chalk from "chalk";
import app from "./app.js";
import connect from "./config/database.config.js";

const port = 8080;

function startServer() {
  try {
    app.listen(port);

    console.clear();
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
