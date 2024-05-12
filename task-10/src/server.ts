import express from "express";
import path from "path";
import dotenv from "dotenv";
import {
  MikroORM,
  RequestContext,
  type EntityManager as IEntityManager,
} from "@mikro-orm/core";
import { type PostgreSqlDriver as IPostgreSqlDriver } from "@mikro-orm/postgresql";
import apiRouter from "./api";
import generateResponse from "./api/helpers/generateResponse";
import { STATUS_CODES } from "./constants";
import { APP_ENV } from "./config/app.config";
import ormConfig from "./config/orm.config";

dotenv.config({ path: path.resolve(__dirname, `../../.env.${APP_ENV}`) });

export let entityManager: IEntityManager = {} as IEntityManager;

export const runServer = async () => {
  const app = express();
  const orm = await MikroORM.init<IPostgreSqlDriver>(ormConfig);
  entityManager = orm.em;

  app.use(express.json());
  // Note: Create new Identity Map for each request to avoid having one context for whole application
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
      console.error("Internal error performing healthcheck:", error);

      return res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .send(generateResponse(undefined, "Unhealthy."));
    }

    next();
  });

  app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`);
  });
};
