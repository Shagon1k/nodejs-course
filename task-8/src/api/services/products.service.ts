import { productRepository } from "../repositories";

export const getAllProducts = () => {
  const products = productRepository.findAllProducts();

  return products;
};

export const getProductById = (productId: string) => {
  const product = productRepository.findProductById(productId);

  return product;
};
