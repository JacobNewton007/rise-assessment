import { Router } from 'express';
import { Request, Response } from 'express';
import ROUTES from './const.routes';
import { StatusCodes } from 'http-status-codes';
import userRouter from './user/routes';
import authenticationRouter from './authentication/routes';
import postRouter from './posts/routes';

export function invalidRoute(_req: Request, res: Response) {
  return res
    .status(StatusCodes.NOT_FOUND)
    .json({ message: 'route does not exist' });
}

export function testRoute(_req: Request, res: Response) {
  return res.status(StatusCodes.OK).json({ message: 'PONG' });
}

// handle unknown routes in the api domain
const invalidRouter = Router();
invalidRouter.all(ROUTES.WILD_CARD, invalidRoute);

const testRouter = Router();
testRouter.all(ROUTES.HOME, testRoute);

const versionOneRouter: Router[] = [
  testRouter,
  userRouter,
  authenticationRouter,
  postRouter,
  invalidRouter,
];

export default versionOneRouter;
