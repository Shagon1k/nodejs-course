import * as UserService from "../services/user.service";
import { STATUS_CODES } from "../constants";
import generateResponse from "./helpers/generateResponse";
import { generateUserLink, generateHobbiesLink } from "./helpers/generateLinks";

import { IApiHandler, IUserDataRequest } from "../types";

const isUserDataRequest = (userData: any): userData is IUserDataRequest =>
  typeof userData?.name === "string" && typeof userData?.email === "string";

const createUser: IApiHandler = (req, res) => {
  let requestBody = "";

  req.on("data", (chunk) => {
    requestBody += chunk;
  });

  req.on("end", () => {
    const requestData = JSON.parse(requestBody);
    const isValid = isUserDataRequest(requestData);

    if (isValid) {
      const newUser = UserService.createUser(requestData);

      const responseData = {
        user: newUser,
        links: {
          self: generateUserLink(newUser.id),
          hobbies: generateHobbiesLink(newUser.id),
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
