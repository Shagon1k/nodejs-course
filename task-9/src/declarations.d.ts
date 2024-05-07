import { ICurrentUser } from "./api/types";

declare module "express" {
  interface Request {
    user?: ICurrentUser;
  }
}
