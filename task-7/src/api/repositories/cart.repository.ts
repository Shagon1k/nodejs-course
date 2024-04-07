import { randomUUID } from "crypto";
import CartModel from "./models/cart.model";
import { IProductEntity } from "./models/product.model";

export const findCartByUserId = async (findUserId: string) => {
  const cart = await CartModel.findOne({ userId: findUserId }).select("-__v");

  return cart || null;
};

export const emptyCartByUserId = async (emptyUserId: string) => {
  await CartModel.updateOne({ userId: emptyUserId }, { items: [] });
};

export const deleteCartById = async (cartId: string) => {
  await CartModel.deleteOne({ _id: cartId });
};

export const createCart = async (userId: string) => {
  const newCart = {
    _id: randomUUID(),
    userId: userId,
    isDeleted: false,
    items: [],
  };

  await CartModel.create(newCart);
};

export const updateCartItem = async (
  cartId: string,
  item: IProductEntity,
  count: number = 1
) => {
  const cart = await CartModel.findOne({ _id: cartId });

  if (!cart) {
    return;
  }

  const cartItemIndex = cart.items.findIndex(
    ({ product: { id } }) => id === item.id
  );

  if (cartItemIndex === -1 && count > 0) {
    // Add new item if not exist
    cart.items.push({ product: item, count });
  } else {
    if (count === 0) {
      // Drop (remove) item if new count equals 0
      cart.items.splice(cartItemIndex, 1);
    } else {
      // Update item's count if it > 0
      cart.items[cartItemIndex].count = count;
    }
  }
  // Update Cart in Database
  await cart.save();
};
