import dotenv from "dotenv";
import { initDatabase } from "./scripts/init-db";
import { runServer } from "./server";

dotenv.config({ path: "../.env" });

const startApp = async () => {
  await initDatabase();
  // runServer();
};

startApp();
