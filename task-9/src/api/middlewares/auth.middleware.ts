import {
  type Request as IRequest,
  type Response as IResponse,
  type NextFunction as INext,
} from "express";

import { userService } from "../services";
import APIError from "../helpers/apiError";
import { STATUS_CODES } from "../../constants";
import { USER_ROLES } from "../repositories/entities/user.entity";

const SUPPORTED_TOKEN_TYPE = "Bearer";

export const verifyAuthTokenMiddleware = async (
  req: IRequest,
  _: IResponse,
  next: INext
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || typeof authHeader !== "string") {
      throw new APIError(
        "You must be authorized user",
        STATUS_CODES.UNAUTHORIZED
      );
    }

    const [authTokenType, authToken] = authHeader.split(" ");

    if (authTokenType !== SUPPORTED_TOKEN_TYPE) {
      throw new APIError(
        "User is not authorized. Unsupported auth token type.",
        STATUS_CODES.FORBIDDEN
      );
    }

    const user = userService.verifyAuthToken(authToken);

    if (!user) {
      throw new APIError("User is not authorized", STATUS_CODES.FORBIDDEN);
    }

    req.user = user;

    return next();
  } catch (e) {
    next(e);
  }
};

export function isAdminMiddleware(req: IRequest, res: IResponse, next: INext) {
  const currentUserRole = req.user?.role;

  if (currentUserRole !== USER_ROLES.ADMIN) {
    throw new APIError(
      "Admin role required to perform such action",
      STATUS_CODES.UNAUTHORIZED
    );
  }

  next();
}
