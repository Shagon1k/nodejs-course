import winston from "winston";

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp({ format: "ddd, DD MMM YYYY HH:mm:ss" }),
    winston.format.printf((info) => {
      const { timestamp, level, message, ...rest } = info;
      return `[${timestamp}] ${level.toUpperCase()} ${message} ${JSON.stringify(
        rest,
        null,
        2
      )}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
