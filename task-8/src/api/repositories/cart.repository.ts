import { randomUUID } from "crypto";
import { Product as IProduct } from "./entities/product.entity";

export interface ICartItemEntity {
  product: IProduct;
  count: number;
}

export interface ICartEntity {
  id: string;
  userId: string;
  isDeleted: boolean;
  items: ICartItemEntity[];
}

const carts_db: ICartEntity[] = [];

export const findCartByUserId = (findUserId: string) => {
  const cart = carts_db.find(({ userId }) => userId === findUserId) || null;

  return structuredClone(cart);
};

export const emptyCartByUserId = (emptyUserId: string) => {
  const cart = carts_db.find(({ userId }) => userId === emptyUserId);

  if (cart) {
    cart.items = [];
  }
};

export const deleteCartById = (cartId: string) => {
  const cartIndex = carts_db.findIndex(({ id }) => id === cartId);

  if (cartIndex !== -1) {
    carts_db.splice(cartIndex, 1);
  }
};

export const createCart = (userId: string) => {
  const newCart: ICartEntity = {
    id: randomUUID(),
    userId: userId,
    isDeleted: false,
    items: [],
  };

  carts_db.push(newCart);
};

export const updateCartItem = (
  cartId: string,
  item: IProduct,
  count: number = 1
) => {
  const cart = carts_db.find(({ id }) => id === cartId);

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
};
