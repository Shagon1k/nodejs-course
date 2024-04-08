import dotenv from "dotenv";
import { initDatabase } from "./scripts/init-db";
import { runServer } from "./server";

dotenv.config({ path: "../.env" });

const startApp = async () => {
  // Note: Task requirements specific - By default DB should be filled with some users and products
  await initDatabase();

  runServer();
};

startApp();
