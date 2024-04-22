import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Product } from "../../api/repositories/entities/product.entity";

export class ProductSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const products = [
      {
        id: "b073d31b-6cd1-4dd3-8a73-d1b48c6cbd81",
        title: "Don Quixote",
        description: "Don Quixote by Miguel de Cervantes",
        price: 29.99,
      },
      {
        id: "28364493-2462-43c3-9f64-7af5175f978a",
        title: "Moby Dick",
        description: "Moby Dick by Herman Melville",
        price: 31.99,
      },
    ];

    for (const product of products) {
      await em.create(Product, product);
    }
  }
}
