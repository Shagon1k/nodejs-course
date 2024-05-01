import { userRepository } from "../repositories";

export const checkIfUserExist = async (userId: string) => {
  const user = await userRepository.findUserById(userId);

  return !!user;
};
