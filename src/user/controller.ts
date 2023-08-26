import { StatusCodes } from 'http-status-codes';
import userService, { UserService } from './services/user.service';
import { Response, Request } from 'express';
import { SignupDto } from '../authentication/dtos/signup.dto';

export class UserController {
  constructor(private readonly userService: UserService) {}

  public getUsers = async (_req: Request, res: Response) => {
    const users = await this.userService.getUsers();
    return res.status(StatusCodes.OK).json({
      status: 'success',
      statusCode: StatusCodes.OK,
      message: 'Successfully retrieved users',
      data: users,
    });
  };

  public createUser = async (req: Request, res: Response) => {
    const SignUpPayload = new SignupDto(req.body);
    const _user = await this.userService.createUser(SignUpPayload);
    const [user, err] = _user;
    if (err != null) {
      return res.status(StatusCodes.CONFLICT).json({
        status: 'error',
        statusCode: StatusCodes.CONFLICT,
        message: err.message,
        data: user,
      });
    }
    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      statusCode: StatusCodes.CREATED,
      message: 'User created successfully',
      data: user,
    });
  };
}

const userController = new UserController(userService);

export default userController;
