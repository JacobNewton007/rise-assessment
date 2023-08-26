import { UserEntity } from '../entities/user.entity';
import {
  CreateUserArgs,
  UserRepository,
  UserResponse,
} from '../repositories/user.interface';
import userRepository from '../repositories/user.repositories';

export interface UserService {
  getUser(id: string): Promise<UserResponse>;
  createUser(user: CreateUserArgs): Promise<UserResponse>;
  getUsers(): Promise<UserEntity[]>;
  getUserByEmail(email: string): Promise<UserResponse>;
}

export class UserServiceImpl implements UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getUser(id: string): Promise<UserResponse> {
    return await this.userRepository.getUser(id);
  }

  public async createUser(user: CreateUserArgs): Promise<UserResponse> {
    return await this.userRepository.createUser(user);
  }

  public async getUsers(): Promise<UserEntity[]> {
    return await this.userRepository.getUsers();
  }

  public async getUserByEmail(email: string): Promise<UserResponse> {
    return await this.userRepository.getUserByEmail(email);
  }
}

const userService: UserService = new UserServiceImpl(userRepository);

export default userService;
