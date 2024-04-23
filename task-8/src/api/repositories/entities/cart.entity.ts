import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  OneToOne,
  Ref,
  Opt,
} from "@mikro-orm/core";
import { User } from "./user.entity";
import { Product } from "./product.entity";
import { Order } from "./order.entity";
export interface ICartItem {
  product: Product;
  count: number;
}

@Entity()
export class Cart {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id!: string;

  @ManyToOne(() => User, { nullable: false, ref: true })
  user!: Ref<User>;

  @OneToOne(() => Order, (order) => order.cart)
  order?: Order;

  @Property()
  isDeleted: boolean & Opt = true;

  @Property({ type: "json" })
  items: ICartItem[] & Opt = [];
}
