import mongoose, { Schema, Document } from "mongoose";
import { type IProductEntity, ProductSchema } from "./product.model";

export interface ICartItemEntity {
  product: IProductEntity;
  count: number;
}

export const CartItemSchema = new Schema(
  {
    product: { type: ProductSchema, required: true },
    count: { type: Number, required: true },
  },
  { _id: false }
);

export interface ICartEntity extends Document {
  _id: string;
  userId: string;
  isDeleted: boolean;
  items: ICartItemEntity[];
}

const CartSchema: Schema = new Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  items: { type: [CartItemSchema], default: [] },
});

export default mongoose.model<ICartEntity>("Cart", CartSchema);
