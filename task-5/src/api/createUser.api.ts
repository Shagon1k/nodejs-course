import { randomUUID } from "crypto";
import { users_db } from "../db-mock/db";
import { STATUS_CODES } from "../constants";
import { LINKS_PATTERNS_MAP, LINKS_USER_ID_TEMPLATE } from "../config";
import omitFields from "./helpers/omitFields";
import generateResponse from "./helpers/generateResponse";

import { IApiHandler, IUser, IUserDataRequest } from "../types";

const isUserDataRequest = (userData: any): userData is IUserDataRequest =>
  typeof userData?.name === "string" && typeof userData?.email === "string";

const createNewUser = (userDataRequest: IUserDataRequest): IUser => ({
  id: randomUUID(),
  hobbies: [],
  name: userDataRequest.name,
  email: userDataRequest.email,
});

const createUser: IApiHandler = (req, res) => {
  let requestBody = "";

  req.on("data", (chunk) => {
    requestBody += chunk;
  });

  req.on("end", () => {
    const requestData = JSON.parse(requestBody);
    const isValid = isUserDataRequest(requestData);

    if (isValid) {
      const newUser = createNewUser(requestData);
      users_db.push(newUser);

      const responseData = {
        user: omitFields(newUser, ["hobbies"]),
        links: {
          self: LINKS_PATTERNS_MAP.USER.replace(
            LINKS_USER_ID_TEMPLATE,
            newUser.id
          ),
          hobbies: LINKS_PATTERNS_MAP.HOBBIES.replace(
            LINKS_USER_ID_TEMPLATE,
            newUser.id
          ),
        },
      };
      res.statusCode = STATUS_CODES.CREATED;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(generateResponse(responseData)));
    } else {
      res.statusCode = STATUS_CODES.BAD_REQUEST;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify(
          generateResponse(
            undefined,
            "Bad Request: 'email' and 'name' are required strings"
          )
        )
      );
    }
  });

  req.on("error", (error: Error) => {
    throw error;
  });
};

export default createUser;
