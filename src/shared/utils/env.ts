import { configDotenv } from 'dotenv';
import Joi from 'joi';
import config from '../../config/env';

configDotenv();

export default class Env {
  private static validatedEnv: any;

  public static async validateEnv<T>(validationSchema: Joi.ObjectSchema<T>) {
    try {
      this.validatedEnv = await validationSchema.validateAsync(config);
    } catch (e) {
      throw e;
    }
  }

  public static get<T = string>(key: string) {
    if (this.validatedEnv?.[key] != null) return this.validatedEnv[key] as T;
    return (config as any)[key] as T;
  }
}
