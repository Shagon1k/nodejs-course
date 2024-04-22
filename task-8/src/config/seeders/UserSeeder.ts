import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { User } from "../../api/repositories/entities/user.entity";

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const users = [
      { id: "75662389-00cd-4bf0-bc2f-04c52ef92c0f" },
      { id: "24481f00-064a-4a5b-ad1c-992ade2fbd41" },
      { id: "9c571f05-cb4f-4a3f-9f13-98b6cf135c80" },
    ];

    for (const user of users) {
      await em.create(User, user);
    }
  }
}
