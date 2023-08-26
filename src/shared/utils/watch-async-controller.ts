import { Request, Response } from 'express';
import loggerWrapper from '../services/log_wrapper';
import Env from './env';

export const WatchAsyncController = (
  fn: (req: Request, res: Response, ...args: any[]) => Promise<any>,
) =>
  async function (req: Request, res: Response, ...args: any[]) {
    try {
      return await fn(req, res, ...args);
    } catch (error) {
      loggerWrapper.error('', `error, ${fn.name}`, 'middleware.index');
      loggerWrapper.error(error.stack as string);
      console.log('>>>>>>>>>', error);
      res.status(500).json({
        status: false,
        message:
          'We encountered a problem while processing your request. Please try again',
        errors:
          Env.get<string>('NODE_ENV') !== 'production'
            ? (error as any).errors || error.message
            : null,
      });
    }
  };
