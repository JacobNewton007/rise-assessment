import { Router } from 'express';
import userController from './controller';
import ROUTES from './const';
import { WatchAsyncController } from '../shared/utils/watch-async-controller';
import AuthMiddleware from '../shared/middlewares/auth.middleware';
import { RequestBodyValidatorMiddleware } from '../shared/middlewares/request-body-validator.middleware';
import { signupPayloadValidatorSchema } from '../authentication/validators/signup-payload-validator.schema';
const userRouter = Router();

userRouter.get(
  ROUTES.GET_USERS,
  AuthMiddleware,
  WatchAsyncController(userController.getUsers),
);

userRouter.post(
  ROUTES.REGISTER,
  RequestBodyValidatorMiddleware(signupPayloadValidatorSchema),
  WatchAsyncController(userController.createUser),
);

export default userRouter;
