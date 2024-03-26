import { STATUS_CODES } from "../../constants";

class APIError extends Error {
  constructor(public message: string, public statusCode: STATUS_CODES) {
    super(message);
  }
}

export default APIError;
