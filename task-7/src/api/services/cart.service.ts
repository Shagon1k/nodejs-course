import {
  cartRepository,
  productRepository,
  orderRepository,
} from "../repositories";
import { type ICartItemEntity } from "../repositories/models/cart.model";
import omitFields from "../helpers/omitFields";

export const enum CART_ERRORS {
  NO_PRODUCT,
  NO_CART,
  CART_IS_EMPTY,
}

const calculateTotal = (items: ICartItemEntity[]) =>
  items.reduce((acc, { product: { price }, count }) => acc + price * count, 0);

export const getCartByUserId = async (userId: string) => {
  let cart = await cartRepository.findCartByUserId(userId);

  // Cart does not exist -> create one
  if (!cart) {
    await cartRepository.createCart(userId);
    cart = (await cartRepository.findCartByUserId(userId))!;
  }

  const total = calculateTotal(cart.items);

  return { cart: omitFields(cart.toObject(), ["isDeleted"]), total };
};

export const updateCart = async (
  userId: string,
  productId: string,
  count: number
) => {
  const product = await productRepository.findProductById(productId);
  // No such product
  if (!product) {
    return CART_ERRORS.NO_PRODUCT;
  }

  const cart = await cartRepository.findCartByUserId(userId);
  // No cart exist
  if (!cart) {
    return CART_ERRORS.NO_CART;
  }

  // Add item to cart or update it's count
  await cartRepository.updateCartItem(cart.id, product, count);

  const updatedCart = (await cartRepository.findCartByUserId(userId))!;
  const total = calculateTotal(updatedCart.items);
  // Return updated cart
  return { cart: omitFields(updatedCart.toObject(), ["isDeleted"]), total };
};

export const emptyCartByUserId = async (userId: string) => {
  await cartRepository.emptyCartByUserId(userId);
};

export const checkout = async (userId: string) => {
  const cart = await cartRepository.findCartByUserId(userId);

  if (!cart || cart.items.length === 0) {
    return CART_ERRORS.CART_IS_EMPTY;
  }

  await orderRepository.createOrder(
    userId,
    cart.toObject(),
    calculateTotal(cart.items)
  );
  await cartRepository.deleteCartById(cart._id);

  const createdOrder = await orderRepository.findOrderByCartId(cart._id)!;

  return createdOrder;
};
