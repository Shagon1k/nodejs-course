import fs from "fs";

const LOG_FILE_NAME = "activityMonitor.log";

process.on("message", (message) => {
  const logFileTime = Date.now();
  fs.appendFile(
    LOG_FILE_NAME,
    `${Math.floor(logFileTime / 1000)}: ${message}\r`,
    (error) => {
      if (error) {
        console.error("Unsuccessful write to log file", error);
      }
    }
  );
});
