import { Request, Response, NextFunction } from 'express';
export type ExpressController = (
  req: Request,
  res: Response,
  next?: NextFunction,
) => any;

export type SessionAccount = {
  id: string;
};

interface RequestWithClaim extends Request {
  claim?: any;
}

export default RequestWithClaim;
