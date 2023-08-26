import { Request, Response } from 'express';
import userService, { UserService } from '../user/services/user.service';
import Logger from '../config/logger';
import { LoginDto } from './dtos/login.dto';
import hashingService, {
  HashingService,
} from '../shared/services/hashing/hashing.service';
import jwtSigningService from '../shared/services/token/jwt';
import { UserResponse } from '../user/repositories/user.interface';
import { SignedData } from '../shared/interfaces';
import { StatusCodes } from 'http-status-codes';
import { CreateNullClass } from '../shared/utils/null-class';
import { UserEntity } from '../user/entities/user.entity';

export class AuthenticationController {
  private readonly logger = new Logger(AuthenticationController.name);
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
  ) {}

  public login = async (
    req: Request,
    res: Response,
  ): Promise<ReturnType<any>> => {
    const nullUserEntity = CreateNullClass<UserEntity>();
    const loginPayload = new LoginDto(req.body);
    this.logger.log('Received login request for email: ' + loginPayload.email);

    const userResponse: UserResponse = await this.userService.getUserByEmail(
      loginPayload.email,
    );
    const [user, err] = userResponse;
    if (err != null) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        statusCode: StatusCodes.NOT_FOUND,
        message: err.message,
        data: nullUserEntity,
      });
      // return;
    }

    const doesPasswordMatch = await this.hashingService.compare(
      loginPayload.password,
      user.password as string,
    );

    if (!doesPasswordMatch) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Incorrect password',
        data: nullUserEntity,
      });
    }

    const signedData: SignedData = {
      user_id: user.id,
      email: user.email as string,
      name: user.name as string,
    };
    const token = await jwtSigningService.sign(signedData);
    return res.status(StatusCodes.OK).json({
      status: 'success',
      Statuscode: StatusCodes.OK,
      message: 'Logged in successfully',
      data: { user: signedData, token },
    });
  };
}

const authenticationController = new AuthenticationController(
  userService,
  hashingService,
);

export default authenticationController;
