import {
  ConflictException,
  InternalServerErrorException,
  NotFoundError,
} from '../../shared/errors';
import { UserEntity } from '../entities/user.entity';

export type CreateUserArgs = Partial<
  Omit<UserEntity, 'id' | 'created_at' | 'updated_at'>
>;

export type UserResponse = [
  UserEntity,
  InternalServerErrorException | NotFoundError | ConflictException,
];

export interface UserRepository {
  getUser(id: string): Promise<UserResponse>;
  createUser(user: CreateUserArgs): Promise<UserResponse>;
  getUsers(): Promise<UserEntity[]>;
  getUserByEmail(email: string): Promise<UserResponse>;
}
