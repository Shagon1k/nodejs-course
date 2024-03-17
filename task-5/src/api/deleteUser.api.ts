import { users_db } from "../db-mock/db";
import { ROUTES_REGEXP_MAP } from "../config";
import { STATUS_CODES } from "../constants";
import generateResponse from "./helpers/generateResponse";

import { IApiHandler } from "../types";

const deleteUser: IApiHandler = (req, res) => {
  const userId = req?.url?.match(ROUTES_REGEXP_MAP.USER)?.[1];
  const userDbIndex = users_db.findIndex(({ id }) => id === userId);

  if (userDbIndex !== -1) {
    users_db.splice(userDbIndex, 1);

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
        generateResponse(undefined, `User with id ${userId} doesn't exist`)
      )
    );
  }
};

export default deleteUser;
