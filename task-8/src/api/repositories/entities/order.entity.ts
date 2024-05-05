import {
  Entity,
  PrimaryKey,
  Property,
  Enum,
  ManyToOne,
  OneToOne,
  Opt,
  Ref,
} from "@mikro-orm/core";
import { Cart } from "./cart.entity";
import { User } from "./user.entity";
import { Product } from "./product.entity";

export enum ORDER_STATUS {
  CREATED = "created",
  COMPLETED = "completed",
}

@Entity()
export class Order {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id!: string;

  @OneToOne(() => Cart, (cart) => cart.order, {
    owner: true,
    serializer: (value) => value.id,
    serializedName: "cartId",
  })
  cart!: Cart;

  @ManyToOne(() => User, {
    ref: true,
    serializer: (value) => value.id,
    serializedName: "userId",
  })
  user!: Ref<User>;

  // TO ASK: Whether such approach "ok" considering Products should not be aware of (relate to) Carts
  @Property({ type: "json" })
  items: { product: Product; count: number }[] & Opt = [];

  @Property({ type: "json" })
  payment!: { type: string; address?: string; creditCard?: string };

  @Property({ type: "json" })
  delivery!: { type: string; address?: string };

  @Property()
  comments!: string;

  @Enum(() => ORDER_STATUS)
  status!: ORDER_STATUS;

  @Property({ columnType: "numeric(8, 2)" })
  total!: number;
}
