import path from "path";
import dotenv from "dotenv";
import { type Options as IOptions } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Migrator } from "@mikro-orm/migrations";
import { SeedManager } from "@mikro-orm/seeder";

// Note: Only "dev" environment supported. In real project several configs could be created for different environments ("prod", "dev", "test", etc.)
const APP_ENV = "dev";

dotenv.config({ path: path.resolve(__dirname, `../../.env.${APP_ENV}`) });

const options: IOptions<PostgreSqlDriver> = {
  driver: PostgreSqlDriver,
  dbName: process.env.MIKRO_ORM_DB_NAME,
  user: process.env.MIKRO_ORM_USER,
  password: process.env.MIKRO_ORM_PASSWORD,
  host: process.env.MIKRO_ORM_HOST,
  port: +process.env.MIKRO_ORM_PORT!,
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
