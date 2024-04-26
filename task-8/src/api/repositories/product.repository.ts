import { wrap } from "@mikro-orm/core";
import { entityManager } from "../../server";
import { Product } from "./entities/product.entity";

export const findProductById = async (productId: string) => {
  const productRepository = entityManager.getRepository(Product);
  const product = await productRepository.findOne(productId);

  return product ? wrap(product).toObject() : product;
};

export const findAllProducts = async () => {
  const productRepository = entityManager.getRepository(Product);
  const products = await productRepository.findAll();

  return products;
};
