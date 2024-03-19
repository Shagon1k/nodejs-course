import * as UserService from "../services/user.service";
import { ROUTES_REGEXP_MAP } from "../config";
import { STATUS_CODES } from "../constants";
import generateResponse from "./helpers/generateResponse";

import { IApiHandler } from "../types";

const deleteUser: IApiHandler = (req, res) => {
  const requestUserId = req?.url?.match(ROUTES_REGEXP_MAP.USER)?.[1];

  const isDeleteSucceed = UserService.deleteUser(requestUserId);

  if (isDeleteSucceed) {
    const responseData = {
      success: true,
    };
    res.statusCode = STATUS_CODES.OK;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(generateResponse(responseData)));
  } else {
    res.statusCode = STATUS_CODES.NOT_FOUND;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify(
        generateResponse(
          undefined,
          `User with id ${requestUserId} doesn't exist`
        )
      )
    );
  }
};

export default deleteUser;
