import { configDotenv } from 'dotenv';
configDotenv();

const test = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.TEST_DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default test;
