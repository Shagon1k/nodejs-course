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

// @Entity()
// export class CartItem {
//   @PrimaryKey()
//   id!: number;

//   @Property({ type: "integer" })
//   count!: number;

//   @ManyToOne(() => Product)
//   product!: Product;
// }

@Entity()
export class Cart {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id!: string;

  @ManyToOne(() => User, { nullable: false, ref: true })
  user?: Ref<User>;

  @OneToOne(() => Order, (order) => order.cart)
  order?: Order;

  @Property()
  isDeleted: boolean & Opt = true;

  // TO ASK: Whether such approach "ok" considering Products should not be aware of (relate to) Carts
  @Property({ type: "json" })
  items: { product: Product; count: number }[] & Opt = [];
}
