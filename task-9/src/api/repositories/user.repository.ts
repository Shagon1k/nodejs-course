import { wrap } from "@mikro-orm/core";
import { entityManager } from "../../server";
import { User, USER_ROLES } from "./entities/user.entity";

export const findUserById = async (userId: string) => {
  const userRepository = entityManager.getRepository(User);
  const userLoaded = await userRepository.findOne(userId);

  return userLoaded ? wrap(userLoaded).toObject() : userLoaded;
};

export const findUserByEmail = async (email: string) => {
  const userRepository = entityManager.getRepository(User);
  const userLoaded = await userRepository.findOne(
    { email },
    { fields: ["id", "email", "password", "role"] } // Note: { exclude: ["carts", "orders"] } is not working for some reason ¯\_(ツ)_/¯
  );

  return userLoaded ? wrap(userLoaded).toObject() : userLoaded;
};

export const createUser = async (
  email: string,
  password: string,
  role: USER_ROLES
) => {
  const userRepository = entityManager.getRepository(User);
  userRepository.create({
    email,
    password,
    role,
  });
};
