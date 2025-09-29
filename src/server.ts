import chalk from "chalk";
import app from "./app.js";
import connect from "./config/database.config.js";
import { envConfig } from "./config/env.config.js";
// import { createClient } from "redis";

const port = envConfig.port || 4000;
const redisUrl = envConfig.redis_url || "redis://localhost:6379";

// export const redisClient = createClient({ url: redisUrl });

async function startServer() {
  try {
    console.clear();

    // await redisClient.connect();
    console.log(chalk.green("✓"), "Redis connected successfully.");

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
