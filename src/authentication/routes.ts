import { Router } from 'express';
import authenticationController from './controller';
import { WatchAsyncController } from '../shared/utils/watch-async-controller';
import ROUTES from './const';
import { RequestBodyValidatorMiddleware } from '../shared/middlewares/request-body-validator.middleware';
import { loginPayloadValidatorSchema } from './validators/login-payload-validator.schema';

const authenticationRouter = Router();

authenticationRouter.post(
  ROUTES.LOGIN,
  RequestBodyValidatorMiddleware(loginPayloadValidatorSchema),
  WatchAsyncController(authenticationController.login),
);

export default authenticationRouter;
