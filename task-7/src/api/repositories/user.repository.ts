import UserModel from "./models/user.model";

export const getUserById = async (userId: string) => {
  const user = await UserModel.findOne({ _id: userId });

  return user || null;
};
