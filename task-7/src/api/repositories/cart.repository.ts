import { randomUUID } from "crypto";
import CartModel, { type ICartEntity } from "./models/cart.model";
import { type IProductEntity } from "./models/product.model";

export const findCartByUserId = async (findUserId: string) => {
  const cart = await CartModel.findOne({ userId: findUserId })
    .select("-__v")
    .lean();

  return cart || null;
};

export const emptyCartByUserId = async (emptyUserId: string) => {
  await CartModel.updateOne({ userId: emptyUserId }, { items: [] });
};

export const deleteCartById = async (cartId: string) => {
  await CartModel.deleteOne({ _id: cartId });
};

export const createCart = async (userId: string) => {
  const newCart: ICartEntity = {
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
    ({ product: { _id } }) => _id === item._id
  );

  if (cartItemIndex === -1) {
    // New item flow
    if (count > 0) {
      // Add new item if not exist
      cart.items.push({ product: item, count });
    } else {
      // Do nothing if 0 count of new item should be added
      return;
    }
  } else {
    // Existing item flow
    if (count > 0) {
      // Update item's count if it > 0
      cart.items[cartItemIndex].count = count;
    } else {
      // Drop (remove) item if new count equals 0
      cart.items.splice(cartItemIndex, 1);
    }
  }

  // Update Cart in Database
  await cart.save();
};
