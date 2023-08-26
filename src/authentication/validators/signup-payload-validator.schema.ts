import Joi from 'joi';

export const signupPayloadValidatorSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .required(),
  phone_number: Joi.string()
    .pattern(/^\+/)
    .message('phone number must be in international format (starting with a +)')
    .min(8)
    .max(15),
  password: Joi.string().required(),
});
