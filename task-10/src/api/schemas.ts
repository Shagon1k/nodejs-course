import Joi from "joi";

import { USER_ROLES } from "./repositories/entities/user.entity";

interface IUpdateCartSchema {
  userId: string;
  productId: string;
  count: number;
}

interface IRegisterUserSchema {
  email: string;
  password: string;
  role: USER_ROLES;
}

interface ILoginUserSchema {
  email: string;
  password: string;
}

export const updateCartSchema = Joi.object<IUpdateCartSchema>({
  userId: Joi.string().required(),
  productId: Joi.string().required(),
  count: Joi.number().min(0).required(),
});

export const registerUserSchema = Joi.object<IRegisterUserSchema>({
  email: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string()
    .valid(...Object.values(USER_ROLES))
    .required(),
});

export const loginUserSchema = Joi.object<ILoginUserSchema>({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
