import express from "express";
import mongoose from "mongoose";
import apiRouter from "./api";

const PORT = 8000;

export const runServer = async () => {
  try {
    const { DB_HOST, DB_PORT, DB_USER_USERNAME, DB_USER_PASSWORD, DB_NAME } =
      process.env;

    console.log("SERVER INIT: Connecting to Database");
    await mongoose.connect(
      `mongodb://${DB_USER_USERNAME}:${DB_USER_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
    );
    process.on("SIGINT", async () => {
      await mongoose.disconnect();
      console.log("SERVER STOP: Disconnected from MongoDB");
      process.exit(0);
    });

    console.log("SERVER INIT: Starting server");
    const app = express();
    app.use(express.json());
    app.use("/api", apiRouter);
    app.listen(PORT, () => {
      console.log(`SERVER INIT: Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.error("SERVER INIT: Error starting server:", e);
    process.exit(1);
  }
};
