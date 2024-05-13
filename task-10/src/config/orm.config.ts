import path from "path";
import dotenv from "dotenv";
import { type Options as IOptions } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Migrator } from "@mikro-orm/migrations";
import { SeedManager } from "@mikro-orm/seeder";
import { APP_ENV_FILE_POSTFIX } from "./app.config";

dotenv.config({
  path: path.resolve(__dirname, `../../.env.${APP_ENV_FILE_POSTFIX}`),
});

const options: IOptions<PostgreSqlDriver> = {
  baseDir: process.cwd(),
  driver: PostgreSqlDriver,
  dbName: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT!,
  // path to your JS entities (dist), relative to `baseDir`
  entities: ["./build/api/repositories/entities"],
  // path to our TS entities (src), relative to `baseDir`
  entitiesTs: ["./src/api/repositories/entities"],
  migrations: {
    // path to the folder with migrations
    path: "./build/config/migrations",
    // path to the folder with TS migrations
    pathTs: "./src/config/migrations",
  },
  seeder: {
    defaultSeeder: "DatabaseSeeder", // default seeder class name
    // path to the folder with seeders
    path: "./build/config/seeders",
    // path to the folder with TS seeders
    pathTs: "./src/config/seeders",
  },
  extensions: [Migrator, SeedManager],
};

export default options;
