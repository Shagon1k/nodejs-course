import {
  cartRepository,
  productRepository,
  orderRepository,
} from "../repositories";
import omitFields from "../helpers/omitFields";

export const enum CART_ERRORS {
  NO_PRODUCT,
  NO_CART,
  CART_IS_EMPTY,
}

const calculateTotal = (items: cartRepository.ICartItemEntity[]) =>
  items.reduce((acc, { product: { price }, count }) => acc + price * count, 0);

export const getCartByUserId = (userId: string) => {
  let cart = cartRepository.findCartByUserId(userId);

  // Cart does not exist -> create one
  if (!cart) {
    cartRepository.createCart(userId);
    cart = cartRepository.findCartByUserId(userId)!;
  }

  const total = calculateTotal(cart.items);

  return { cart: omitFields(cart, ["isDeleted"]), total };
};

export const updateCart = (
  userId: string,
  productId: string,
  count: number
) => {
  const product = productRepository.findProductById(productId);
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
  const total = calculateTotal(updatedCart.items);
  // Return updated cart
  return { cart: omitFields(updatedCart, ["isDeleted"]), total };
};

export const emptyCartByUserId = (userId: string) => {
  cartRepository.emptyCartByUserId(userId);
};

export const checkout = (userId: string) => {
  const cart = cartRepository.findCartByUserId(userId);

  if (!cart || cart.items.length === 0) {
    return CART_ERRORS.CART_IS_EMPTY;
  }

  orderRepository.createOrder(userId, cart, calculateTotal(cart.items));
  cartRepository.deleteCartById(cart.id);

  const createdOrder = orderRepository.findOrderByCartId(cart.id)!;

  return createdOrder;
};
