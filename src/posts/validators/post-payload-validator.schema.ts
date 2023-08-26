import Joi from 'joi';

export const PostPayloadValidatorSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
}).unknown();

export const CommentPayloadValidatorSchema = Joi.object({
  comment: Joi.string().required(),
}).unknown();
