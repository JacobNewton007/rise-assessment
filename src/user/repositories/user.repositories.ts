import { CreateUserArgs, UserRepository } from './user.interface';
import { UserEntity } from '../entities/user.entity';
import { sqlQuest } from '../../config/database';
import { SqlQuest } from '@bitreel/sql-quest';
import { CreateNullClass } from '../../shared/utils/null-class';
import { ConflictException, NotFoundError } from '../../shared/errors';
import { UserResponse } from './user.interface';
import hashingService from '../../shared/services/hashing/hashing.service';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly sqlQuest: SqlQuest) {}

  public async getUser(id: string): Promise<UserResponse> {
    const errRes: NotFoundError = new NotFoundError('User not found');
    let user: UserEntity = new UserEntity();

    const res = await this.sqlQuest.oneOrNone(
      'SELECT * FROM users WHERE id = $1',
      [id],
    );
    if (!res) {
      user = CreateNullClass<UserEntity>();
      return [user, errRes];
    }

    user = new UserEntity({
      id: res.id,
      name: res.name,
      email: res.email,
      password: res.password,
      phone_number: res.phone_number,
    });

    return [user, null as unknown as NotFoundError];
  }

  public async createUser({
    name,
    email,
    password,
    phone_number,
  }: CreateUserArgs): Promise<UserResponse> {
    const errRes: ConflictException = new ConflictException(
      'User already exist',
    );
    let result: UserEntity = new UserEntity();

    const existUserResponse = await this.getUserByEmail(email as string);
    const [existUser, _] = existUserResponse;
    if (existUser) {
      result = CreateNullClass<UserEntity>();
      return [result, errRes];
    }

    const hashPassword = await hashingService.hash(password as string);
    const res = await this.sqlQuest.one(
      `INSERT INTO users(email, phone_number, password, name)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [email, phone_number, hashPassword, name],
    );
    result = new UserEntity({
      id: res.id,
      name: res.name,
      email: res.email,
      phone_number: res.phone_number,
    });

    return [result, null as unknown as ConflictException];
  }

  public async getUsers(): Promise<UserEntity[]> {
    const users = await this.sqlQuest.manyOrNone(
      `SELECT id, name, email, phone_number, created_at, updated_at FROM users ORDER BY created_at DESC`,
    );
    return users;
  }

  public async getUserByEmail(email: string): Promise<UserResponse> {
    const errRes: NotFoundError = new NotFoundError('User not found');
    let user: UserEntity = new UserEntity();

    const res = await this.sqlQuest.oneOrNone(
      'SELECT * FROM users WHERE email = $1',
      [email],
    );

    if (!res) {
      user = CreateNullClass<UserEntity>();
      return [user, errRes];
    }

    user = new UserEntity({
      id: res.id,
      name: res.name,
      email: res.email,
      password: res.password,
      phone_number: res.phone_number,
    });

    return [user, null as unknown as NotFoundError];
  }
}

const userRepository: UserRepository = new UserRepositoryImpl(sqlQuest);

export default userRepository;
