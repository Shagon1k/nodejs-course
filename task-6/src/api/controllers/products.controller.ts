import { Router } from "express";
import APIError from "../../api/helpers/apiError";
import generateResponse from "../helpers/generateResponse";
import { STATUS_CODES } from "../../constants";
import { productsService } from "../services";

const productsController = Router();

productsController.get("/", (_, res) => {
  const products = productsService.getAllProducts();

  res.status(STATUS_CODES.OK).send(generateResponse(products));
});

productsController.get("/:productId", (req, res) => {
  const productId = req.params.productId;

  const product = productsService.getProductById(productId);

  if (!product) {
    throw new APIError("No product with such id", STATUS_CODES.NOT_FOUND);
  }

  res.status(STATUS_CODES.OK).send(generateResponse(product));
});

export default productsController;
