import ProductModel from "./models/product.model";

export const findProductById = async (productId: string) => {
  const product = await ProductModel.findOne({ _id: productId })
    .select("-__v")
    .lean();

  return product || null;
};

export const findAllProducts = async () => {
  const products = await ProductModel.find().select("-__v").lean();

  return products;
};
