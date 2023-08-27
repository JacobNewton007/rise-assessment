import { configDotenv } from 'dotenv';
configDotenv();

const development = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DEVELOPMENT_DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default development;
