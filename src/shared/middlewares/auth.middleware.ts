import { NextFunction, Response } from 'express';
import { UnAuthorizedException } from '../errors';
import jwtSigningService from '../services/token/jwt';
import RequestWithClaim from '../types';
import { SignedData } from '../interfaces';
export default function AuthMiddleware(
  req: RequestWithClaim,
  _res: Response,
  next: NextFunction,
) {
  const token = (req?.headers?.authorization as string)?.split(' ')[1];
  if (token == null) {
    throw new UnAuthorizedException();
  }

  const decoded = jwtSigningService.verify(token) as SignedData;
  req.claim = decoded;
  next();
}
