import { describe, it } from 'mocha';
import { expect } from 'chai';
import { UserRepositoryImpl } from '../../src/user/repositories/user.repositories';
import { CreateNullClass } from '../../src/shared/utils/null-class';
import { UserEntity } from '../../src/user/entities/user.entity';
import { NotFoundError } from '../../src/shared/errors';
import sinon from 'sinon';

export class SqlQuestWrapper {
  constructor(private sqlQuest: { oneOrNone: (arg0: any, arg1: any) => any, one: (arg0: any, arg1: any) => any, manyOrNone: (arg0: any, arg1: any) => any }) {}

  oneOrNone(query: any, args: any) {
    return this.sqlQuest.oneOrNone(query, args);
  }
  one(query: any, args: any) {
    return this.sqlQuest.one(query, args);
  }

  manyOrNone(query: any, args: any) {
    return this.sqlQuest.manyOrNone(query, args);
  }

}
describe('UserRepositoryImpl', () => {
  let sqlQuestStub: { callsFake?: any; oneOrNone: any; one: any; manyOrNone: any };
  let userRepository: UserRepositoryImpl;

  beforeEach(() => {
    sqlQuestStub = {
      oneOrNone: sinon.stub(),
      one: sinon.stub(),
      manyOrNone: sinon.stub(),
      // You might need to add other methods that are used in your code
    };
    const sqlQuestWrapper = new SqlQuestWrapper(sqlQuestStub);
    userRepository = new UserRepositoryImpl(sqlQuestWrapper as any);
  });

  describe('getUser', () => {
    it('should return user entity when user exists', async () => {
      const userData: UserEntity = {
        id: 'test',
        email: 'test@example.com',
        password: 'password',
        name: 'test',
        phone_number: '1234567890',
      };
      const userEntity = new UserEntity(userData);

      sqlQuestStub.oneOrNone.resolves(userEntity);

      const result = await userRepository.getUser(
        userData.id as any,
      );
      expect(result[0]).to.deep.equal(userEntity);
      expect(result[1]).to.be.null;
    });

    it('should return null user entity and NotFoundError when user does not exist', async () => {
      const nonExistentId = 'not-exist';
      const nullUserEntity = CreateNullClass<UserEntity>();
      const notFoundError = new NotFoundError('User not found');

      sqlQuestStub.oneOrNone.resolves(null);

      const result = await userRepository.getUser(nonExistentId);

      expect(result[0]).to.deep.equal(nullUserEntity);
      expect(result[1]).to.deep.equal(notFoundError);
      sinon.assert.calledOnceWithExactly(
        sqlQuestStub.oneOrNone,
        'SELECT * FROM users WHERE id = $1',
        [nonExistentId],
      );
    });

    it('should handle database error', async () => {
      const databaseError = new Error('Database error');

      sqlQuestStub.oneOrNone.rejects(databaseError);

      try {
        await userRepository.getUser('test-id');
        // Ensure this line is never reached since the method should throw an error
        expect.fail('Expected an error to be thrown');
      } catch (error) {
        expect(error).to.equal(databaseError);
        sinon.assert.calledOnceWithExactly(
          sqlQuestStub.oneOrNone,
          'SELECT * FROM users WHERE id = $1',
          ['test-id'],
        );
      }
    });
  });

  describe('createUser', () => {
    it('should create a user and return the user entity', async () => {
      const userData = {
        name: 'test',
        email: 'test@example.com',
        password: 'password',
        phone_number: '1234567890',
      };


      const createdUser = {
        id: 'user-id',
        name: userData.name,
        email: userData.email,
        phone_number: userData.phone_number
      };

      sqlQuestStub.one.resolves(createdUser);

      const resultRes = await userRepository.createUser(userData);
      const [result, _] = resultRes;
      expect(result).to.deep.equal(new UserEntity(createdUser));
    });
  });

  describe('getUsers', () => {
    it('should return a list of user entities', async () => {
      const userList: UserEntity[] = [
        {
          id: 'test',
          email: 'test@example.com',
          password: 'password',
          name: 'test',
          phone_number: '1234567890',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'test2',
          email: 'test2@example.com',
          password: 'password',
          name: 'test2',
          phone_number: '1234567890',
          created_at: new Date(),
          updated_at: new Date(),
        }
      ];

      sqlQuestStub.manyOrNone.resolves(userList);

      const result = await userRepository.getUsers();
      expect(result).to.deep.equal(userList);
    });
  });

  describe('getUserByEmail', () => {
    it('should return user entity when user with email exists', async () => {
      const userEmail = 'test@example.com';
      const userData = {
        id: 'test-id',
        email: userEmail,
        password: 'password',
        name: 'test',
        phone_number: '1234567890',
      };
      const userEntity = new UserEntity(userData);
  
      sqlQuestStub.oneOrNone.resolves(userData);
  
      const result = await userRepository.getUserByEmail(userEmail);
  
      expect(result[0]).to.deep.equal(userEntity);
      expect(result[1]).to.be.null;
      sinon.assert.calledOnceWithExactly(
        sqlQuestStub.oneOrNone,
        'SELECT * FROM users WHERE email = $1',
        [userEmail],
      );
    });
  
    it('should return null user entity and NotFoundError when user with email does not exist', async () => {
      const nonExistentEmail = 'nonexistent@example.com';
      const nullUserEntity = CreateNullClass<UserEntity>();
      const notFoundError = new NotFoundError('User not found');
  
      sqlQuestStub.oneOrNone.resolves(null);
  
      const result = await userRepository.getUserByEmail(nonExistentEmail);
  
      expect(result[0]).to.deep.equal(nullUserEntity);
      expect(result[1]).to.deep.equal(notFoundError);
      sinon.assert.calledOnceWithExactly(
        sqlQuestStub.oneOrNone,
        'SELECT * FROM users WHERE email = $1',
        [nonExistentEmail],
      );
    });
  
    it('should handle database error', async () => {
      const databaseError = new Error('Database error');
  
      sqlQuestStub.oneOrNone.rejects(databaseError);
  
      try {
        await userRepository.getUserByEmail('test@example.com');
        // Ensure this line is never reached since the method should throw an error
        expect.fail('Expected an error to be thrown');
      } catch (error) {
        expect(error).to.equal(databaseError);
        sinon.assert.calledOnceWithExactly(
          sqlQuestStub.oneOrNone,
          'SELECT * FROM users WHERE email = $1',
          ['test@example.com'],
        );
      }
    });
  });  
});
