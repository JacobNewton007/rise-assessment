import Joi from 'joi';
import { AppEnv } from '../enums';

export interface EnvProps {
  PORT: number;
  NODE_ENV: string;
  DATABASE_URL: string;
  SWAGGER_ROUTE: string;
  REDIS_SESSION_STORE_URL: string;
  SESSION_SECRET: string;
  PAPERTRAIL_HOST: string;
  PAPERTRAIL_PORT: string;
  JWT_SECRET: string;
}

export const envValidatorSchema = Joi.object<EnvProps>({
  PORT: Joi.number().default(8000),
  NODE_ENV: Joi.string()
    .required()
    .valid(AppEnv.DEVELOPMENT, AppEnv.TEST, AppEnv.STAGING, AppEnv.PRODUCTION)
    .default(AppEnv.DEVELOPMENT),

  DATABASE_URL: Joi.string().required(),
  PAPERTRAIL_HOST: Joi.string().required(),
  PAPERTRAIL_PORT: Joi.string().required(),
  REDIS_SESSION_STORE_URL: Joi.string(),
  JWT_SECRET: Joi.string(),
  SESSION_SECRET: Joi.string(),
}).unknown(true);
