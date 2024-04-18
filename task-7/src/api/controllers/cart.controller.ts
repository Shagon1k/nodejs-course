import { Router } from "express";
import APIError from "../../api/helpers/apiError";
import generateResponse from "../helpers/generateResponse";
import { STATUS_CODES } from "../../constants";
import { AUTH_TOKEN_HEADER } from "../config";
import { updateCartSchema } from "../schemas";
import { cartService } from "../services";

const cartController = Router();

cartController.get("/", async (req, res, next) => {
  try {
    const userId = req.headers[AUTH_TOKEN_HEADER] as string;
    const { cart, total } = await cartService.getCartByUserId(userId);

    res.status(STATUS_CODES.OK).send(generateResponse({ cart, total }));
  } catch (e) {
    next(e);
  }
});

cartController.put("/", async (req, res, next) => {
  try {
    const reqUserId = req.headers[AUTH_TOKEN_HEADER] as string;
    const requestBody = req.body;
    const validatedRequest = updateCartSchema.validate({
      userId: reqUserId,
      ...requestBody,
    });

    // Request is not valid
    if (validatedRequest.error) {
      throw new APIError(
        validatedRequest.error.message,
        STATUS_CODES.BAD_REQUEST
      );
    }

    const { userId, productId, count } = validatedRequest.value;
    const updateCartResult = await cartService.updateCart(
      userId,
      productId,
      count
    );

    // No product with such ID
    if (updateCartResult === cartService.CART_ERRORS.NO_PRODUCT) {
      throw new APIError("Products are not valid", STATUS_CODES.BAD_REQUEST);
    }

    // No cart exist for user
    if (updateCartResult === cartService.CART_ERRORS.NO_CART) {
      throw new APIError("Cart was not found", STATUS_CODES.NOT_FOUND);
    }

    const { cart, total } = updateCartResult;
    res.status(STATUS_CODES.OK).send(generateResponse({ cart, total }));
  } catch (e) {
    next(e);
  }
});

cartController.delete("/", async (req, res, next) => {
  try {
    const userId = req.headers[AUTH_TOKEN_HEADER] as string;

    await cartService.emptyCartByUserId(userId);

    res.status(STATUS_CODES.OK).send(generateResponse({ success: true }));
  } catch (e) {
    next(e);
  }
});

cartController.post("/checkout", async (req, res, next) => {
  try {
    const userId = req.headers[AUTH_TOKEN_HEADER] as string;

    const checkoutResult = await cartService.checkout(userId);

    if (checkoutResult === cartService.CART_ERRORS.CART_IS_EMPTY) {
      throw new APIError("Cart is empty", STATUS_CODES.BAD_REQUEST);
    }

    res
      .status(STATUS_CODES.OK)
      .send(generateResponse({ order: checkoutResult }));
  } catch (e) {
    next(e);
  }
});

export default cartController;
