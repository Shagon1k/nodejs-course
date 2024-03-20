import { cartRepository, productsRepository } from "../repositories";

export const enum CART_ERRORS {
  NO_PRODUCT,
  NO_CART,
}

export const getCartByUserId = (userId: string) => {
  let cart = cartRepository.findCartByUserId(userId);

  // Cart does not exist -> create one
  if (!cart) {
    cartRepository.createCart(userId);
    cart = cartRepository.findCartByUserId(userId)!;
  }

  const total = cart.items.reduce(
    (acc, { product: { price } }) => acc + price,
    0
  );

  return { cart, total };
};

export const updateCart = (
  userId: string,
  productId: string,
  count: number
) => {
  const product = productsRepository.findProductById(productId);
  // No such product
  if (!product) {
    return CART_ERRORS.NO_PRODUCT;
  }

  const cart = cartRepository.findCartByUserId(userId);
  // No cart exist
  if (!cart) {
    return CART_ERRORS.NO_CART;
  }

  // Add item to cart or update it's count
  cartRepository.updateCartItem(cart.id, product, count);

  const updatedCart = cartRepository.findCartByUserId(userId)!;
  // Return updated cart
  return updatedCart;
};

export const deleteCartByUserId = (userId: string) => {
  cartRepository.deleteCartByUserId(userId);
};

// cartRepository.createCart(userId, product, count);
// const newCart = cartRepository.findCartByUserId(userId);
// return newCart;
