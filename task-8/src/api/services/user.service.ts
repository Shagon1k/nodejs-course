import { userRepository } from "../repositories";

export const checkIfUserExist = (userId: string) => {
  const user = userRepository.getUserById(userId);

  return !!user;
};
