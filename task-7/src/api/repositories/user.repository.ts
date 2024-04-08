import UserModel from "./models/user.model";

export const getUserById = async (userId: string) => {
  const user = await UserModel.findOne({ _id: userId }).select("-__v").lean();

  return user || null;
};
