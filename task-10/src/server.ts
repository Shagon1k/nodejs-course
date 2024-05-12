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

  app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`);
  });
};
