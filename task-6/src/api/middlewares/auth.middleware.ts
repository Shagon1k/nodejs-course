import {
  type Request as IRequest,
  type Response as IResponse,
  type NextFunction as INext,
} from "express";

import { userService } from "../services";
import APIError from "../helpers/apiError";
import { STATUS_CODES } from "../../constants";

const AUTH_TOKEN_HEADER = "x-user-id";

const authMiddleware = (req: IRequest, _: IResponse, next: INext) => {
  const authToken = req.headers[AUTH_TOKEN_HEADER];

  if (!authToken || typeof authToken !== "string") {
    throw new APIError(
      "You must be authorized user",
      STATUS_CODES.UNAUTHORIZED
    );
  }

  if (!userService.checkIfUserExist(authToken)) {
    throw new APIError("User is not authorized", STATUS_CODES.FORBIDDEN);
  }

  return next();
};

export default authMiddleware;
