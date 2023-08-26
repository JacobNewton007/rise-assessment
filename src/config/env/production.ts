import { configDotenv } from 'dotenv';
configDotenv();

const production = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.PRODUCTION_DATABASE_URL,
  PAPERTRAIL_HOST: process.env.PAPERTRAIL_HOST,
  PAPERTRAIL_PORT: process.env.PAPERTRAIL_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default production;
