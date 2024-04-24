import { Reference } from "@mikro-orm/core";
import { entityManager } from "../../server";
import { Order, ORDER_STATUS } from "./entities/order.entity";
import { type Cart as ICart } from "./entities/cart.entity";

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
  const orderRepository = entityManager.getRepository(Order);
  const order = await orderRepository.findOne({
    cart: { id: findCartId },
  });

  return order;
};

export const createOrder = async (
  userId: string,
  cart: ICart,
  total: number
) => {
  const orderRepository = entityManager.getRepository(Order);

  orderRepository.create({
    user: Reference.createFromPK(Order, userId),
    cart,
    items: cart.items,
    payment: { ...mockedPayment },
    delivery: { ...mockedDelivery },
    comments: "Dummy comment",
    status: ORDER_STATUS.CREATED,
    total,
  });

  await entityManager.flush();
};
