import { users_db } from "../db-mock/db";
import { STATUS_CODES } from "../constants";
import {
  LINKS_PATTERNS_MAP,
  LINKS_USER_ID_TEMPLATE,
  CACHE_MAX_AGE,
} from "../config";
import omitFields from "./helpers/omitFields";
import generateResponse from "./helpers/generateResponse";

import { IApiHandler } from "../types";

const getUsers: IApiHandler = (_, res) => {
  const responseData = users_db.map((user) => ({
    user: omitFields(user, ["hobbies"]),
    links: {
      self: LINKS_PATTERNS_MAP.USER.replace(LINKS_USER_ID_TEMPLATE, user.id),
      hobbies: LINKS_PATTERNS_MAP.HOBBIES.replace(
        LINKS_USER_ID_TEMPLATE,
        user.id
      ),
    },
  }));
  res.statusCode = STATUS_CODES.OK;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", `public, max-age=${CACHE_MAX_AGE}`);
  res.end(JSON.stringify(generateResponse(responseData)));
};

export default getUsers;
