import { Router } from 'express';
import postController from './controller';
import ROUTES from './const';
import AuthMiddleware from '../shared/middlewares/auth.middleware';
import { WatchAsyncController } from '../shared/utils/watch-async-controller';
import { RequestBodyValidatorMiddleware } from '../shared/middlewares/request-body-validator.middleware';
import {
  CommentPayloadValidatorSchema,
  PostPayloadValidatorSchema,
} from './validators/post-payload-validator.schema';
const postRouter = Router();

postRouter.post(
  ROUTES.CREATE_POST,
  RequestBodyValidatorMiddleware(PostPayloadValidatorSchema),
  AuthMiddleware,
  WatchAsyncController(postController.createPost),
);
postRouter.get(
  ROUTES.GET_USERS_POSTS,
  AuthMiddleware,
  WatchAsyncController(postController.getUsersPosts),
);
postRouter.get(
  ROUTES.GET_TOP_USER_POSTS,
  AuthMiddleware,
  WatchAsyncController(postController.getTopUserPosts),
);
postRouter.post(
  ROUTES.CREATE_COMMENT,
  RequestBodyValidatorMiddleware(CommentPayloadValidatorSchema),
  AuthMiddleware,
  WatchAsyncController(postController.createComment),
);

export default postRouter;
