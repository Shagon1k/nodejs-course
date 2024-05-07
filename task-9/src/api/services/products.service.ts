import { productRepository } from "../repositories";

export const getAllProducts = async () => {
  const products = await productRepository.findAllProducts();

  return products;
};

export const getProductById = async (productId: string) => {
  const product = await productRepository.findProductById(productId);

  return product;
};
