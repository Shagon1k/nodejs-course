import { randomUUID } from "crypto";
import { type ICartEntity } from "./models/cart.model";
import OrderModel, { ORDER_STATUS } from "./models/order.model";

const mockedPayment = {
  type: "paypal",
  address: "London",
  creditCard: "1234-1234-1234-1234",
};

const mockedDelivery = {
  type: "post",
  address: "London",
};

export const findOrderByCartId = async (findCartId: string) => {
  const order = OrderModel.find({ cartId: findCartId }).select("-__v").lean();

  return order || null;
};

export const createOrder = async (
  userId: string,
  cart: ICartEntity,
  total: number
) => {
  const newOrder = {
    _id: randomUUID(),
    userId,
    cartId: cart._id,
    items: cart.items,
    payment: { ...mockedPayment },
    delivery: { ...mockedDelivery },
    comments: "comment",
    status: ORDER_STATUS.CREATED,
    total,
  };

  OrderModel.create(newOrder);
};
