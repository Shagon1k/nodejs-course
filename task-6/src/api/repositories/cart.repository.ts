import { randomUUID } from "crypto";
import { IProductEntity } from "./products.repository";

export interface ICartItemEntity {
  product: IProductEntity;
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

export const deleteCartByUserId = (deleteUserId: string) => {
  const deleteCartId = findCartByUserId(deleteUserId)?.id;

  if (deleteCartId) {
    carts_db.filter(({ id }) => id !== deleteCartId);
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
  item: IProductEntity,
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
};
