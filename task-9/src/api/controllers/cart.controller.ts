import { Router, type Request as IRequest } from "express";
import APIError from "../../api/helpers/apiError";
import generateResponse from "../helpers/generateResponse";
import { STATUS_CODES } from "../../constants";
import { updateCartSchema } from "../schemas";
import { cartService } from "../services";
import { isAdminMiddleware } from "../middlewares";

const cartController = Router();

cartController.get("/", async (req: IRequest, res, next) => {
  try {
    const currentUserId = req.user?.user_id!;
    const { cart, total } = await cartService.getCartByUserId(currentUserId);

    res.status(STATUS_CODES.OK).json(generateResponse({ cart, total }));
  } catch (e) {
    next(e);
  }
});

cartController.put("/", async (req: IRequest, res, next) => {
  try {
    const currentUserId = req.user?.user_id!;
    const requestBody = req.body;
    const validatedRequest = updateCartSchema.validate({
      userId: currentUserId,
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
    res.status(STATUS_CODES.OK).json(generateResponse({ cart, total }));
  } catch (e) {
    next(e);
  }
});

cartController.delete(
  "/",
  isAdminMiddleware,
  async (req: IRequest, res, next) => {
    try {
      const currentUserId = req.user?.user_id!;

      await cartService.emptyCartByUserId(currentUserId);

      res.status(STATUS_CODES.OK).json(generateResponse({ success: true }));
    } catch (e) {
      next(e);
    }
  }
);

cartController.post("/checkout", async (req: IRequest, res, next) => {
  try {
    const currentUserId = req.user?.user_id!;

    const checkoutResult = await cartService.checkout(currentUserId);

    if (checkoutResult === cartService.CART_ERRORS.CART_IS_EMPTY) {
      throw new APIError("Cart is empty", STATUS_CODES.BAD_REQUEST);
    }

    res
      .status(STATUS_CODES.OK)
      .json(generateResponse({ order: checkoutResult }));
  } catch (e) {
    next(e);
  }
});

export default cartController;
