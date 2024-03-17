import { users_db } from "../db-mock/db";
import { ROUTES_REGEXP_MAP, CACHE_MAX_AGE } from "../config";
import { STATUS_CODES } from "../constants";
import { LINKS_PATTERNS_MAP, LINKS_USER_ID_TEMPLATE } from "../config";
import generateResponse from "./helpers/generateResponse";

import { IApiHandler } from "../types";

const getUserHobbies: IApiHandler = (req, res) => {
  const userId = req?.url?.match(ROUTES_REGEXP_MAP.HOBBIES)?.[1];
  const userDbIndex = users_db.findIndex(({ id }) => id === userId);

  if (userDbIndex !== -1) {
    const responseData = {
      hobbies: [...users_db[userDbIndex].hobbies],
      links: {
        self: LINKS_PATTERNS_MAP.HOBBIES.replace(
          LINKS_USER_ID_TEMPLATE,
          userId as string
        ),
        user: LINKS_PATTERNS_MAP.USER.replace(
          LINKS_USER_ID_TEMPLATE,
          userId as string
        ),
      },
    };
    res.statusCode = STATUS_CODES.OK;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", `private, max-age=${CACHE_MAX_AGE}`);
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

export default getUserHobbies;
