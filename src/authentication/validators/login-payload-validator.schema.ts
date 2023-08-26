import Joi from 'joi';

export const loginPayloadValidatorSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).unknown();
