import { userRepository } from "../repositories";

export const checkIfUserExist = async (userId: string) => {
  const user = await userRepository.getUserById(userId);

  return !!user;
};
