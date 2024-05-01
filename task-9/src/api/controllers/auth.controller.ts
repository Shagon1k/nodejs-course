import { Router } from "express";
import APIError from "../../api/helpers/apiError";
import generateResponse from "../helpers/generateResponse";
import { STATUS_CODES } from "../../constants";
import { registerUserSchema, loginUserSchema } from "../schemas";
import { userService } from "../services";

const authController = Router();

authController.post("/register", async (req, res, next) => {
  try {
    const validatedRequest = registerUserSchema.validate(req.body);
    // Request is not valid
    if (validatedRequest.error) {
      throw new APIError(
        validatedRequest.error.message,
        STATUS_CODES.BAD_REQUEST
      );
    }
    const { email, password, role } = validatedRequest.value;
    const isUserAlreadyExist = await userService.checkIfUserExistByEmail(email);

    if (isUserAlreadyExist) {
      throw new APIError(
        "Email is not valid. User with such email already exists.",
        STATUS_CODES.BAD_REQUEST
      );
    }

    const newUser = await userService.registerUser(email, password, role);

    res.status(STATUS_CODES.OK).json(generateResponse(newUser));
  } catch (e) {
    next(e);
  }
});

authController.post("/login", async (req, res, next) => {
  try {
    const validatedRequest = loginUserSchema.validate(req.body);

    // Request is not valid
    if (validatedRequest.error) {
      throw new APIError(
        validatedRequest.error.message,
        STATUS_CODES.BAD_REQUEST
      );
    }
    const { email, password } = validatedRequest.value;

    const authToken = await userService.loginUser(email, password);

    if (!authToken) {
      throw new APIError(
        "No user with such email or password",
        STATUS_CODES.NOT_FOUND
      );
    }

    res.status(STATUS_CODES.OK).json(generateResponse({ token: authToken }));
  } catch (e) {
    next(e);
  }
});

export default authController;
