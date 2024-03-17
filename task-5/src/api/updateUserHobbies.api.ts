import { users_db } from "../db-mock/db";
import { ROUTES_REGEXP_MAP } from "../config";
import { STATUS_CODES } from "../constants";
import { LINKS_PATTERNS_MAP, LINKS_USER_ID_TEMPLATE } from "../config";
import omitFields from "./helpers/omitFields";
import generateResponse from "./helpers/generateResponse";

import { IApiHandler, IHobbiesDataRequest } from "../types";

const isHobbiesDataRequest = (
  hobbiesData: any
): hobbiesData is IHobbiesDataRequest =>
  Array.isArray(hobbiesData) && hobbiesData.every((i) => typeof i === "string");

const updateUserHobbies: IApiHandler = (req, res) => {
  const userId = req?.url?.match(ROUTES_REGEXP_MAP.HOBBIES)?.[1];
  const userDbIndex = users_db.findIndex(({ id }) => id === userId);

  if (userDbIndex !== -1) {
    let requestBody = "";

    req.on("data", (chunk) => {
      requestBody += chunk;
    });

    req.on("end", () => {
      const requestData = JSON.parse(requestBody);
      const newHobbies = requestData?.hobbies;
      const isValid = isHobbiesDataRequest(newHobbies);

      if (isValid) {
        let updatedHobbiesSet = new Set([
          ...users_db[userDbIndex].hobbies,
          ...newHobbies,
        ]);
        users_db[userDbIndex].hobbies = [...updatedHobbiesSet];
        const updatedUser = users_db[userDbIndex];

        const responseData = {
          user: omitFields(updatedUser, ["hobbies"]),
          links: {
            self: LINKS_PATTERNS_MAP.USER.replace(
              LINKS_USER_ID_TEMPLATE,
              updatedUser.id
            ),
            hobbies: LINKS_PATTERNS_MAP.HOBBIES.replace(
              LINKS_USER_ID_TEMPLATE,
              updatedUser.id
            ),
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
        generateResponse(undefined, `User with id ${userId} doesn't exist`)
      )
    );
  }
};

export default updateUserHobbies;
