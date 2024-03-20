import { productsRepository } from "../repositories";

export const getAllProducts = () => {
  const products = productsRepository.getAllProducts();

  return products;
};

export const getProductById = (productId: string) => {
  const product = productsRepository.getProductById(productId);

  return product;
};
