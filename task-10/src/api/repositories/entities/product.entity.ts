import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

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
}
