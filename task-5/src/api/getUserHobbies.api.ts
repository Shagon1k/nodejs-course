import * as UserService from "../services/user.service";
import { ROUTES_REGEXP_MAP, CACHE_MAX_AGE } from "../config";
import { STATUS_CODES } from "../constants";
import generateResponse from "./helpers/generateResponse";
import { generateUserLink, generateHobbiesLink } from "./helpers/generateLinks";

import { IApiHandler } from "../types";

const getUserHobbies: IApiHandler = (req, res) => {
  const requestUserId = req?.url?.match(ROUTES_REGEXP_MAP.HOBBIES)?.[1];
  const userHobbies = UserService.getUserHobbies(requestUserId);

  if (userHobbies !== null) {
    const responseData = {
      hobbies: userHobbies,
      links: {
        self: generateHobbiesLink(requestUserId!),
        user: generateUserLink(requestUserId!),
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
        generateResponse(
          undefined,
          `User with id ${requestUserId} doesn't exist`
        )
      )
    );
  }
};

export default getUserHobbies;
