import mongoose, { Schema, Document } from "mongoose";
import { type ICartItemEntity, CartItemSchema } from "./cart.model";

export const enum ORDER_STATUS {
  CREATED = "created",
  COMPLETED = "completed",
}

interface IOrderEntity {
  _id: string;
  userId: string;
  cartId: string;
  items: ICartItemEntity[];
  payment: {
    type: string;
    address?: string;
    creditCard?: string;
  };
  delivery: {
    type: string;
    address: any;
  };
  comments: string;
  status: ORDER_STATUS;
  total: number;
}

const PaymentSchema = new Schema(
  {
    type: { type: String, required: true },
    address: { type: String, required: false },
    creditCard: { type: String, required: false },
  },
  { _id: false }
);

const DeliverySchema = new Schema(
  {
    type: { type: String, required: true },
    address: { type: String, required: true },
  },
  { _id: false }
);

const OrderSchema: Schema = new Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  cartId: { type: String, required: true },
  items: { type: [CartItemSchema], default: [] },
  payment: { type: PaymentSchema, required: true },
  delivery: { type: DeliverySchema, required: true },
  comments: { type: String, required: true },
  status: { type: String, required: true },
  total: { type: Number, required: true },
});

export default mongoose.model<IOrderEntity & Document>("Order", OrderSchema);
