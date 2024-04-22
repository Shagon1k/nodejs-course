import { Router } from "express";
import APIError from "../../api/helpers/apiError";
import generateResponse from "../helpers/generateResponse";
import { STATUS_CODES } from "../../constants";
import { productsService } from "../services";

const productsController = Router();

productsController.get("/", async (_, res, next) => {
  try {
    const products = productsService.getAllProducts();

    res.status(STATUS_CODES.OK).send(generateResponse(products));
  } catch (e) {
    next(e);
  }
});

productsController.get("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;

    const product = productsService.getProductById(productId);

    if (!product) {
      throw new APIError("No product with such id", STATUS_CODES.NOT_FOUND);
    }

    res.status(STATUS_CODES.OK).send(generateResponse(product));
  } catch (e) {
    next(e);
  }
});

export default productsController;
