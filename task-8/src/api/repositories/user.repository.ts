import { entityManager } from "../../server";
import { User } from "./entities/user.entity";

export const findUserById = async (userId: string) => {
  const userRepository = entityManager.getRepository(User);
  const user = await userRepository.findOne(userId);

  return user;
};
