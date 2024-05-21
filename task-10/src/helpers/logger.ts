import winston from "winston";

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp({ format: "ddd, DD MMM YYYY HH:mm:ss" }),
    winston.format.printf((info) => {
      const { timestamp, level, message, data } = info;
      let printResult = `[${timestamp}] ${level.toUpperCase()} ${message}`;

      if (data) {
        printResult += ` ${JSON.stringify(data, null, 2)}`;
      }

      return printResult;
    })
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
