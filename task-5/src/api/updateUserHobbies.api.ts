import * as UserService from "../services/user.service";
import { ROUTES_REGEXP_MAP } from "../config";
import { STATUS_CODES } from "../constants";
import generateResponse from "./helpers/generateResponse";
import { generateUserLink, generateHobbiesLink } from "./helpers/generateLinks";

import { IApiHandler, IHobbiesDataRequest } from "../types";

const isHobbiesDataRequest = (
  hobbiesData: any
): hobbiesData is IHobbiesDataRequest =>
  Array.isArray(hobbiesData) && hobbiesData.every((i) => typeof i === "string");

const updateUserHobbies: IApiHandler = (req, res) => {
  const requestUserId = req?.url?.match(ROUTES_REGEXP_MAP.HOBBIES)?.[1];
  const dbUser = UserService.findUser(requestUserId);

  if (dbUser) {
    let requestBody = "";

    req.on("data", (chunk) => {
      requestBody += chunk;
    });

    req.on("end", () => {
      const requestData = JSON.parse(requestBody);
      const newHobbies = requestData?.hobbies;
      const isValid = isHobbiesDataRequest(newHobbies);

      if (isValid) {
        UserService.updateUserHobbies(requestUserId!, newHobbies);
        const updatedUser = UserService.findUser(requestUserId)!;

        const responseData = {
          user: updatedUser,
          links: {
            self: generateUserLink(updatedUser.id),
            hobbies: generateHobbiesLink(updatedUser.id),
          },
        };
        res.statusCode = STATUS_CODES.OK;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(generateResponse(responseData)));
      } else {
        res.statusCode = STATUS_CODES.BAD_REQUEST;
        res.setHeader("Content-Type", "text/plain");
        res.end("Bad Request: 'hobbies' should be a string array");
      }
    });

    req.on("error", (error: Error) => {
      throw error;
    });
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

export default updateUserHobbies;
