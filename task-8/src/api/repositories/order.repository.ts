import { randomUUID } from "crypto";
import { ICartItem, type Cart as ICart } from "./entities/cart.entity";

const enum ORDER_STATUS {
  CREATED = "created",
  COMPLETED = "completed",
}

export interface IOrderEntity {
  id: string;
  userId: string;
  cartId: string;
  items: ICartItem[];
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };
  delivery: {
    type: string;
    address: any;
  };
  comments: string;
  status: ORDER_STATUS;
  total: number;
}

const orders_db: IOrderEntity[] = [];

const mockedPayment = {
  type: "paypal",
  address: "London",
  creditCard: "1234-1234-1234-1234",
};

const mockedDelivery = {
  type: "post",
  address: "London",
};

export const findOrderByCartId = (findCartId: string) => {
  const order = orders_db.find(({ cartId }) => cartId === findCartId) || null;

  return structuredClone(order);
};

export const createOrder = (userId: string, cart: ICart, total: number) => {
  const newOrder: IOrderEntity = {
    id: randomUUID(),
    userId,
    cartId: cart.id,
    items: cart.items,
    payment: { ...mockedPayment },
    delivery: { ...mockedDelivery },
    comments: "",
    status: ORDER_STATUS.CREATED,
    total,
  };

  orders_db.push(newOrder);
};
