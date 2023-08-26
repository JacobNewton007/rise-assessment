import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import { describe, it } from 'mocha';
import request from 'supertest';
import app from '../../src/config/express';

const baseUrl = '/api/v1';
describe('AuthenticationController', () => {
  describe('createUser', () => {
    it('should successfully create a user', (done) => {
      request(app)
        .post(`${baseUrl}/users`)
        .send({
          name: 'test',
          email: 'test@support.com',
          password: 'testSuper1#',
        })
        .end((_err, response) => {
          expect(response.status).to.equal(StatusCodes.CREATED);
          expect(response.body.status).to.equal('success');
          expect(response.body.message).to.equal('User created successfully');
          expect(response.body.data).to.be.a('object');
          done();
        });
    });
  });
  describe('login', () => {
    it('should successfully log in', (done) => {
      const loginPayload = {
        email: 'test@support.com',
        password: 'testSuper1#',
      };

      request(app)
        .post(`${baseUrl}/auth/login`)
        .send(loginPayload)
        .end((_err, response) => {
          expect(response.status).to.equal(StatusCodes.OK);
          expect(response.body.status).to.equal('success');
          expect(response.body.message).to.equal('Logged in successfully');
          expect(response.body.data.token).to.be.a('string');
          process.env.UserId = response.body.data.user.user_id;
          process.env.AuthToken = response.body.data.token;
          done();
        });
    });

    it('should handle invalid email', (done) => {
      const loginPayload = {
        email: 'invalid@example.com',
        password: 'password',
      };
      request(app)
        .post(`${baseUrl}/auth/login`)
        .send(loginPayload)
        .end((_err, response) => {
          expect(response.status).to.equal(StatusCodes.NOT_FOUND);
          expect(response.body.message).to.equal('User not found');
          done();
        });
    });

    it('should handle invalid password', (done) => {
      const loginPayload = {
        email: 'test@support.com',
        password: 'password',
      };
      request(app)
        .post(`${baseUrl}/auth/login`)
        .send(loginPayload)
        .end((_err, response) => {
          expect(response.status).to.equal(StatusCodes.BAD_REQUEST);
          expect(response.body.message).to.equal('Incorrect password');
          done();
        });
    });
  });

  describe('getUsers', () => {
    it('should successfully get users', (done) => {
      request(app)
        .get(`${baseUrl}/users`)
        .set('Authorization', `Bearer ${process.env.AuthToken}`)
        .end((_err, response) => {
          expect(response.status).to.equal(StatusCodes.OK);
          expect(response.body.status).to.equal('success');
          expect(response.body.message).to.equal(
            'Successfully retrieved users',
          );
          expect(response.body.data).to.be.a('array');
          done();
        });
    });
  });
});
