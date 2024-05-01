import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { userRepository } from "../repositories";
import { USER_ROLES } from "../repositories/entities/user.entity";
import omitFields from "../helpers/omitFields";
import { type ICurrentUser } from "../types";

const BCRYPT_SALT_ROUNDS = 10;
const AUTH_TOKEN_EXPIRATION_TIME_HOURS = 2;

export const checkIfUserExistByEmail = async (email: string) => {
  const user = await userRepository.findUserByEmail(email);

  return !!user;
};

export const registerUser = async (
  email: string,
  password: string,
  role: USER_ROLES
) => {
  const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

  await userRepository.createUser(email, hashedPassword, role);
  const newUser = (await userRepository.findUserByEmail(email))!; // Newly created user definitely exists if no error

  return omitFields(newUser, ["password"]);
};

export const loginUser = async (email: string, password: string) => {
  const user = await userRepository.findUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return null;
  }

  const jwtPayload: ICurrentUser = {
    user_id: user.id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(jwtPayload, process.env.AUTH_TOKEN_KEY!, {
    expiresIn: `${AUTH_TOKEN_EXPIRATION_TIME_HOURS}h`,
  });

  return token;
};

export const verifyAuthToken = (token: string) => {
  try {
    const user = jwt.verify(token, process.env.AUTH_TOKEN_KEY!) as ICurrentUser;

    return user;
  } catch (err) {
    return null;
  }
};
