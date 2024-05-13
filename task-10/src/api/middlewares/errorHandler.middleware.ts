import {
  type Request as IRequest,
  type Response as IResponse,
  type NextFunction as INext,
} from "express";

import APIError from "../helpers/apiError";
import generateResponse from "../helpers/generateResponse";
import logger from "../../helpers/logger";
import { STATUS_CODES } from "../../constants";

const errorHandlerMiddleware = (
  error: Error | APIError,
  _: IRequest,
  res: IResponse,
  __: INext
) => {
  if (error instanceof APIError) {
    res
      .status(error.statusCode)
      .send(generateResponse(undefined, error.message));
  } else {
    logger.error("Internal error.", error);

    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(generateResponse(undefined, "Internal server error.")); // Do not expose internal server errors to avoid exposing implementation details
  }
};

export default errorHandlerMiddleware;
