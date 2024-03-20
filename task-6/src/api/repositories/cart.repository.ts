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

export const createCart = (
  userId: string,
  product: IProductEntity,
  count: number
) => {
  const newCart: ICartEntity = {
    id: randomUUID(),
    userId: userId,
    isDeleted: false,
    items: [{ product, count }],
  };

  carts_db.push(newCart);

  return structuredClone(newCart);
};

export const updateCart = (
  userId: string,
  product: IProductEntity,
  count: number
) => {
  const updateUserId = userId;
  const updateProductId = product.id;

  const userCart = carts_db.find(({ userId }) => userId === updateUserId);

  if (!userCart) {
    const newCart = createCart(userId, product, count);

    return newCart;
  }
};
