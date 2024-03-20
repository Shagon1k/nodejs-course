import { Router } from "express";
import APIError from "../../api/helpers/apiError";
import generateResponse from "../helpers/generateResponse";
import { STATUS_CODES } from "../../constants";
import { cartService } from "../services";

const cartController = Router();

cartController.get("/", (req, res) => {
  // getCartByUserId
});

cartController.put("/", (req, res) => {
  // result either cartService.CART_ERRORS (handle throwing error) or updated cart (return as success)
  // const result = cartService.updateCart();
});

cartController.delete("/", (req, res) => {
  // deleteCartByUserId
});

cartController.post("/checkout", (req, res) => {});

export default cartController;
