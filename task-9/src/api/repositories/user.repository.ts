import { wrap } from "@mikro-orm/core";
import { entityManager } from "../../server";
import { User } from "./entities/user.entity";

export const findUserById = async (userId: string) => {
  const userRepository = entityManager.getRepository(User);
  const userLoaded = await userRepository.findOne(userId);

  return userLoaded ? wrap(userLoaded).toObject() : userLoaded;
};
