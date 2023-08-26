import express from 'express';
import { GlobalErrorCatcherMiddleware } from '../shared/middlewares/global-error-catcher.middleware';
import RequestLoggerMiddleware from '../shared/middlewares/request-logger.middleware';
import ResponseLoggerMiddleware from '../shared/middlewares/response-logger.middleware';
import ROUTES from '../const.routes';
import versionOneRouter, { invalidRoute } from '../route';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(RequestLoggerMiddleware);
app.use(ResponseLoggerMiddleware);

app.use(ROUTES.V1_PATH, versionOneRouter);

// handle unknown routes in the api domain
app.all(ROUTES.WILD_CARD, invalidRoute);

app.use(GlobalErrorCatcherMiddleware); // must be last applied middleware to catch globalErrs

export default app;
