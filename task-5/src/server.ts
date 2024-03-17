import http from "http";
import { ROUTES_REGEXP_MAP } from "./config";
import { STATUS_CODES } from "./constants";
import * as API from "./api";

const PORT = 8000;

export const runServer = () => {
  const server = http.createServer((req, res) => {
    try {
      const reqUrl = req.url || "";
      const reqMethod = req.method;

      switch (true) {
        // GET /api/users - returns a list of users stored
        case reqUrl.match(ROUTES_REGEXP_MAP.USERS) && reqMethod === "GET":
          API.getUsers(req, res);
          break;
        // POST /api/users - creates new user (id = uuid)
        case reqUrl.match(ROUTES_REGEXP_MAP.USERS) && reqMethod === "POST":
          API.createUser(req, res);
          break;
        // DELETE /api/users/:userId - deletes a specific user by id
        case reqUrl.match(ROUTES_REGEXP_MAP.USER) && reqMethod === "DELETE":
          API.deleteUser(req, res);
          break;
        // GET /api/users/:userId/hobbies - returns list of hobbies added for user
        case reqUrl.match(ROUTES_REGEXP_MAP.HOBBIES) && reqMethod === "GET":
          API.getUserHobbies(req, res);
          break;
        // PATCH /api/users/:userId/hobbies - updates user hobbies
        case reqUrl.match(ROUTES_REGEXP_MAP.HOBBIES) && reqMethod === "PATCH":
          API.updateUserHobbies(req, res);
          break;
        default:
          res.statusCode = STATUS_CODES.METHOD_NOT_ALLOWED;
          res.setHeader("Content-Type", "text/plain");
          res.end("Method Not Allowed");
      }
    } catch (e) {
      console.error(e);
      res.statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR;
      res.setHeader("Content-Type", "text/plain");
      res.end("Internal Server Error");
    }
  });

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
