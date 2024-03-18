import * as UserService from "../services/user.service";
import { STATUS_CODES } from "../constants";
import { CACHE_MAX_AGE } from "../config";
import generateResponse from "./helpers/generateResponse";
import { generateUserLink, generateHobbiesLink } from "./helpers/generateLinks";

import { IApiHandler } from "../types";

const getUsers: IApiHandler = (_, res) => {
  const users = UserService.findAllUsers();

  const responseData = users.map((user) => ({
    user,
    links: {
      self: generateUserLink(user.id),
      hobbies: generateHobbiesLink(user.id),
    },
  }));
  res.statusCode = STATUS_CODES.OK;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", `public, max-age=${CACHE_MAX_AGE}`);
  res.end(JSON.stringify(generateResponse(responseData)));
};

export default getUsers;
