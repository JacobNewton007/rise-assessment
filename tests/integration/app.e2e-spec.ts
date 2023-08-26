import app from '../../src/config/express';
import { describe, it } from 'mocha';
import request from 'supertest';
import { expect } from 'chai';

// const app = App()
describe('Integration test', () => {
  it('should return route does not exist error', (done) => {
    request(app)
      .get('/api/v1/hello')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end((_err, res) => {
        expect(res.body.message).to.equal('route does not exist');
        expect(res.statusCode).to.equal(404);
        done();
      });
  });

  it('Healthcheck', (done) => {
    request(app)
      .get('/api/v1/healthcheck/ping')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((_err, res) => {
        expect(res.body.message).to.equal('PONG');
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});
