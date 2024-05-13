type IEnvironment = "development" | "production";
const APP_ENV_MAP = {
  development: "dev",
  production: "prod",
} as const;
export const APP_ENV_FILE_POSTFIX =
  APP_ENV_MAP[process.env.NODE_ENV as IEnvironment] || "dev";
