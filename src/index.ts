import http from 'http';
import { Express } from 'express';
import { envValidatorSchema } from './shared/validators/env-validator';
import Env from './shared/utils/env';
import Logger from './config/logger';
import { connectDB } from './config/database';
import configureSessionStore from './config/session-store';
import app from './config/express';
import { AppEnv } from './shared/enums';
// import Swagger from './config/swagger';

async function main(app: Express): Promise<void> {
  const logger = new Logger(app.name);

  // run the following three before initializing App function
  await Env.validateEnv(envValidatorSchema);
  await connectDB();
  await configureSessionStore();

  const server = http.createServer(app);

  const PORT = Env.get<number>('PORT') || 8080;
  const NODE_ENV = Env.get<string>('NODE_ENV');

  // const SWAGGER_ROUTE = Env.get<string>('SWAGGER_ROUTE');

  // Swagger(app, PORT, {
  //   swaggerDocRoute: SWAGGER_ROUTE,
  //   definitionsPath: [
  //     NODE_ENV == AppEnv.DEVELOPMENT ? './**/*.ts' : './**/*.js',
  //   ],
  //   explorer: true,
  // });

  NODE_ENV !== AppEnv.PRODUCTION &&
    server.on('listening', () => {
      logger.log(`listening on http://localhost:${PORT}`);
    });

  server.listen(PORT);
}

main(app).catch((err) => {
  console.error(">>>>>>>>>>>>>>>>>>>>>>", err);
});
