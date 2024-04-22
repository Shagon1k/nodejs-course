import { Entity, PrimaryKey, OneToMany, Collection } from "@mikro-orm/core";
import { Cart } from "./cart.entity";
import { Order } from "./order.entity";

@Entity()
export class User {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id!: string;

  @OneToMany(() => Cart, (cart) => cart.user, { nullable: true })
  carts?: Collection<Cart> = new Collection<Cart>(this);

  @OneToMany(() => Order, (order) => order.user, { nullable: true })
  orders?: Collection<Order> = new Collection<Order>(this);
}
