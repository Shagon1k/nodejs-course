import {
  Entity,
  PrimaryKey,
  Property,
  //   OneToMany,
  //   Collection,
} from "@mikro-orm/core";
// import { CartItem } from "./cart.entity";

@Entity()
export class Product {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id!: string;

  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property({ columnType: "numeric(6, 2)" })
  price!: number;

  // @OneToMany(() => CartItem, (cartItem) => cartItem.product, { nullable: true }) // Relationship definition
  // cartItems: Collection<CartItem> = new Collection<CartItem>(this);
}
