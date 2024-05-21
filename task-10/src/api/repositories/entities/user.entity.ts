import {
  Entity,
  Unique,
  Property,
  Enum,
  PrimaryKey,
  OneToMany,
  Collection,
} from "@mikro-orm/core";
import { Cart } from "./cart.entity";
import { Order } from "./order.entity";

export enum USER_ROLES {
  ADMIN = "admin",
  SIMPLE_USER = "simple_user",
}

@Entity()
export class User {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id!: string;

  @Property()
  @Unique()
  email!: string;

  @Property({ type: "text" })
  password!: string;

  @Enum({
    items: () => USER_ROLES,
    nativeEnumName: "user_role",
  })
  role!: USER_ROLES;

  @OneToMany(() => Cart, (cart) => cart.user, { nullable: true })
  carts?: Collection<Cart> = new Collection<Cart>(this);

  @OneToMany(() => Order, (order) => order.user, { nullable: true })
  orders?: Collection<Order> = new Collection<Order>(this);
}
