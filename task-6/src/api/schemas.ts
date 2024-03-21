import Joi from "joi";

interface IUpdateCartSchema {
  userId: string;
  productId: string;
  count: number;
}

export const updateCartSchema = Joi.object<IUpdateCartSchema>({
  userId: Joi.string(),
  productId: Joi.string(),
  count: Joi.number().min(0),
});
