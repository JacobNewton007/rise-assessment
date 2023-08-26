import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import { describe, it } from 'mocha';
import request from 'supertest';
import app from '../../src/config/express';


const baseUrl = '/api/v1';

describe('PostController', () => {
  describe('createPost', () => {
    it('should successfully create a post', (done) => {
      request(app)
        .post(`${baseUrl}/users/${process.env.UserId}/posts`)
        .set('Authorization', `Bearer ${process.env.AuthToken}`)
        .set('Content-Type', 'application/json')
        .send({
          title: 'title',
          content: 'content',
        })
        .end((_err, response) => {
          expect(response.status).to.equal(StatusCodes.CREATED);
          expect(response.body.status).to.equal('success');
          expect(response.body.message).to.equal('Post created successfully');
          expect(response.body.data).to.be.a('object');
          process.env.PostId = response.body.data.id;
          done();
        });
    })
  
    it('should fail to create a post', (done) => {
      request(app)
      .post(`${baseUrl}/users/${process.env.UserId}/posts`)
      .set('Authorization', `Bearer ${process.env.AuthToken}`)
        .set('Content-Type', 'application/json')
        .send({
          title: 'title',
          content: 'content',
        })
        .end((_err, response) => {
          expect(response.status).to.equal(StatusCodes.BAD_REQUEST);
          expect(response.body.message).to.equal('Post already exist');
          done();
        });
    })
  })

  describe('createComment', () => {
    it('should successfully create a comment', (done) => {
      request(app)
        .post(`${baseUrl}/posts/${process.env.PostId}/comments`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${process.env.AuthToken}`)
        .send({
          comment: 'content',
        })
        .end((_err, response) => {
          expect(response.status).to.equal(StatusCodes.CREATED);
          expect(response.body.status).to.equal('success');
          expect(response.body.message).to.equal('Successfully created comment');
          expect(response.body.data).to.be.a('object');
          done();
        });
    })
  })
  
  describe('getUsersPosts', () => {
    it('should successfully retrieve users posts', (done) => {
      request(app)
        .get(`${baseUrl}/users/${process.env.UserId}/posts`)
        .set('Authorization', `Bearer ${process.env.AuthToken}`)
        .end((_err, response) => {
          expect(response.status).to.equal(StatusCodes.OK);
          expect(response.body.status).to.equal('success');
          expect(response.body.message).to.equal('Successfully retrieved users posts');
          expect(response.body.data).to.be.a('array');
          done();
        });
    })
  })

  describe('getTopUserPosts', () => {
    it('should successfully retrieve top user posts', (done) => {
      request(app)
        .get(`${baseUrl}/posts/top`)
        .set('Authorization', `Bearer ${process.env.AuthToken}`)
        .end((_err, response) => {
          expect(response.status).to.equal(StatusCodes.OK);
          expect(response.body.status).to.equal('success');
          expect(response.body.message).to.equal('Successfully retrieved top user posts');
          expect(response.body.data).to.be.a('array');
          done();
        });
  })
  });
})