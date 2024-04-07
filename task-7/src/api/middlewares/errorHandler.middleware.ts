import {
  type Request as IRequest,
  type Response as IResponse,
  type NextFunction as INext,
} from "express";

import APIError from "../helpers/apiError";
import generateResponse from "../helpers/generateResponse";
import { STATUS_CODES } from "../../constants";

const errorHandlerMiddleware = async (
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
    console.error("Internal error:", error);

    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(generateResponse(undefined, error.message));
  }
};

export default errorHandlerMiddleware;
