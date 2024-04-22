import {
  type Request as IRequest,
  type Response as IResponse,
  type NextFunction as INext,
} from "express";

import { userService } from "../services";
import APIError from "../helpers/apiError";
import { STATUS_CODES } from "../../constants";
import { AUTH_TOKEN_HEADER } from "../config";

const authMiddleware = async (req: IRequest, _: IResponse, next: INext) => {
  try {
    const authToken = req.headers[AUTH_TOKEN_HEADER];

    if (!authToken || typeof authToken !== "string") {
      throw new APIError(
        "You must be authorized user",
        STATUS_CODES.UNAUTHORIZED
      );
    }

    const isUserExist = await userService.checkIfUserExist(authToken);

    if (!isUserExist) {
      throw new APIError("User is not authorized", STATUS_CODES.FORBIDDEN);
    }

    return next();
  } catch (e) {
    next(e);
  }
};

export default authMiddleware;
