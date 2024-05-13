import express from "express";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import {
  MikroORM,
  RequestContext,
  type EntityManager as IEntityManager,
} from "@mikro-orm/core";
import { type PostgreSqlDriver as IPostgreSqlDriver } from "@mikro-orm/postgresql";
import apiRouter from "./api";
import logger from "./helpers/logger";
import generateResponse from "./api/helpers/generateResponse";
import { STATUS_CODES } from "./constants";
import { APP_ENV_FILE_POSTFIX } from "./config/app.config";
import ormConfig from "./config/orm.config";

dotenv.config({
  path: path.resolve(__dirname, `../../.env.${APP_ENV_FILE_POSTFIX}`),
});

export let entityManager: IEntityManager = {} as IEntityManager;

export const runServer = async () => {
  logger.debug("Initializing server.");
  const app = express();
  logger.debug("Initializing database.");
  const orm = await MikroORM.init<IPostgreSqlDriver>(ormConfig);
  entityManager = orm.em;

  app.use(express.json());
  app.use(
    morgan(":method :url :status - :response-time ms", {
      stream: { write: (message) => logger.info(message.trim()) },
    })
  );
  // Note: Create new Identity Map for each request to avoid having one context for whole application
  // Warn: This middleware should be the last one just before request handlers and before any of custom middleware that is using the ORM.
  app.use((req, res, next) => RequestContext.create(orm.em, next));
  app.use("/api", apiRouter);
  app.get("/health", async (_, res, next) => {
    try {
      const isDBConnected = await orm.isConnected();
      if (!isDBConnected) {
        return res
          .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json(
            generateResponse(
              undefined,
              "Unhealthy. Error connecting to database."
            )
          );
      }

      res
        .status(STATUS_CODES.OK)
        .json(generateResponse({ message: "Healthy." }));
    } catch (error) {
      logger.error("Internal error performing healthcheck.", { data: error });

      return res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .send(generateResponse(undefined, "Unhealthy."));
    }

    next();
  });

  logger.debug("Initialization complete.");
  app.listen(process.env.APP_PORT, () => {
    logger.info(`Server is running on port ${process.env.APP_PORT}.`);
  });
};
