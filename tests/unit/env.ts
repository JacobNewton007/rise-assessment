import { expect } from 'chai';
import Joi from 'joi';
import Env from '../../src/shared/utils/env';
import { configDotenv } from 'dotenv';

configDotenv();

describe('Env Class', () => {
  const validationSchema = Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test')
      .required(),
    PORT: Joi.number().default(3000),
    DATABASE_URL: Joi.string().required(),
    PAPERTRAIL_HOST: Joi.string().required(),
    PAPERTRAIL_PORT: Joi.string().required(),
    REDIS_SESSION_STORE_URL: Joi.string(),
    SWAGGER_ROUTE: Joi.string().default('/api/docs'),
    JWT_SECRET: Joi.string(),
    SESSION_SECRET: Joi.string(),
  });

  beforeEach(() => {
    process.env.NODE_ENV = 'development';
  });

  afterEach(() => {
    delete process.env.NODE_ENV;
  });

  it('should validate and set environment variables', async () => {
    await Env.validateEnv(validationSchema);

    expect(Env.get('NODE_ENV')).to.equal('test');
    expect(Env.get<number>('PORT')).to.equal(
      Number(process.env.PORT),
    );
  });

  it('should fall back to default config for missing variables', async () => {
    await Env.validateEnv(validationSchema);

    expect(Env.get('NODE_ENV')).to.equal('test');
    expect(Env.get<number>('PORT')).to.equal(
      Number(process.env.PORT),
    );
  });
});
