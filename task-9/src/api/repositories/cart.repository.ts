import { Reference, wrap } from "@mikro-orm/core";
import { entityManager } from "../../server";
import { Cart } from "./entities/cart.entity";
import { Product as IProduct } from "./entities/product.entity";

export const findCartByUserId = async (
  findUserId: string,
  options: { isSerialized: boolean } = { isSerialized: true }
) => {
  const cartRepository = entityManager.getRepository(Cart);
  const cartLoaded = await cartRepository.findOne({
    user: { id: findUserId },
    isDeleted: false,
  });

  if (options?.isSerialized) {
    return cartLoaded ? wrap(cartLoaded).toObject() : cartLoaded;
  }

  return cartLoaded;
};

export const emptyCartByUserId = async (emptyUserId: string) => {
  const cart = await findCartByUserId(emptyUserId, { isSerialized: false });

  if (cart) {
    cart.items = [];
    await entityManager.flush();
  }
};

export const deleteCartById = async (cartId: string) => {
  const cartRepository = entityManager.getRepository(Cart);
  const cart = await cartRepository.findOne(cartId);

  if (cart) {
    cart.isDeleted = true;
    await entityManager.flush();
  }
};

export const createCart = async (userId: string) => {
  const cartRepository = entityManager.getRepository(Cart);

  cartRepository.create({
    user: userId,
    isDeleted: false,
    items: [],
  });
};

export const updateCartItem = async (
  cartId: string,
  item: IProduct,
  count: number = 1
) => {
  const cartRepository = entityManager.getRepository(Cart);
  const cart = await cartRepository.findOne(cartId);

  if (!cart) {
    return;
  }

  const cartItemIndex = cart.items.findIndex(
    ({ product: { id } }) => id === item.id
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

  await entityManager.flush();
};
