import express from "express";
import {
  MikroORM,
  RequestContext,
  type EntityManager as IEntityManager,
} from "@mikro-orm/core";
import { type PostgreSqlDriver as IPostgreSqlDriver } from "@mikro-orm/postgresql";
import apiRouter from "./api";
import ormConfig from "./config/orm.config";

const PORT = 8000;

export let entityManager: IEntityManager = {} as IEntityManager;

export const runServer = async () => {
  const app = express();
  const orm = await MikroORM.init<IPostgreSqlDriver>(ormConfig);
  entityManager = orm.em;

  app.use(express.json());
  // Note: Create new Identity Map for each request to avoid having one context for whole application
  app.use((req, res, next) => RequestContext.create(orm.em, next));
  app.use("/api", apiRouter);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
