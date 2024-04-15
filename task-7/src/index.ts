import path from "path";
import dotenv from "dotenv";
import { initDatabase } from "./scripts/init-db";
import { runServer } from "./server";

// Note: Only "dev" environment supported. In real project several configs could be created for different environments ("prod", "dev", "test", etc.)
const APP_ENV = "dev";

dotenv.config({ path: path.resolve(__dirname, `../.env.${APP_ENV}`) });

const startApp = async () => {
  // Note: Task requirements specific - By default DB should be filled with some users and products
  await initDatabase();

  runServer();
};

startApp();
