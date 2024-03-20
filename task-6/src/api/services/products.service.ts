import { productsRepository } from "../repositories";

export const getAllProducts = () => {
  const products = productsRepository.findAllProducts();

  return products;
};

export const getProductById = (productId: string) => {
  const product = productsRepository.findProductById(productId);

  return product;
};
