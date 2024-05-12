type IEnvironment = "development" | "production";
const APP_ENV_MAP = {
  development: "dev",
  production: "prod",
};
export const APP_ENV =
  APP_ENV_MAP[process.env.NODE_ENV as IEnvironment] || "dev";
