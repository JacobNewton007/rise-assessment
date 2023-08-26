import chai from 'chai';
const expect = chai.expect;
import {
  InternalServerErrorException,
  ConflictException,
  BadException,
  ForbiddenException,
  UnAuthorizedException,
  NotFoundException,
} from '../../src/shared/errors';

describe('Custom HTTP Exception Classes', () => {
  it('should create InternalServerErrorException', () => {
    const exception = new InternalServerErrorException();
    expect(exception).to.be.an.instanceOf(Error);
    expect(exception.code).to.equal(500);
    expect(exception.message).to.equal('Internal Server Error');
  });

  it('should create ConflictException', () => {
    const exception = new ConflictException();
    expect(exception).to.be.an.instanceOf(Error);
    expect(exception.code).to.equal(409);
    expect(exception.message).to.equal('conflict');
  });

  it('should create BadException', () => {
    const exception = new BadException();
    expect(exception).to.be.an.instanceOf(Error);
    expect(exception.code).to.equal(400);
    expect(exception.message).to.equal('Bad Request');
  });

  it('should create ForbiddenException', () => {
    const exception = new ForbiddenException();
    expect(exception).to.be.an.instanceOf(Error);
    expect(exception.code).to.equal(403);
    expect(exception.message).to.equal('Forbidden');
  });

  it('should create UnAuthorizedException', () => {
    const exception = new UnAuthorizedException();
    expect(exception).to.be.an.instanceOf(Error);
    expect(exception.code).to.equal(401);
    expect(exception.message).to.equal('UNAUTHORIZED');
  });

  it('should create NotFoundException', () => {
    const exception = new NotFoundException();
    expect(exception).to.be.an.instanceOf(Error);
    expect(exception.code).to.equal(404);
    expect(exception.message).to.equal('Not Found');
  });

  it('should create InternalServerErrorException with custom message', () => {
    const customMessage = 'Custom Internal Server Error';
    const exception = new InternalServerErrorException(customMessage);
    expect(exception).to.be.an.instanceOf(Error);
    expect(exception.code).to.equal(500);
    expect(exception.message).to.equal(customMessage);
  });

  it('should create ConflictException with custom message', () => {
    const customMessage = 'Custom Conflict';
    const exception = new ConflictException(customMessage);
    expect(exception).to.be.an.instanceOf(Error);
    expect(exception.code).to.equal(409);
    expect(exception.message).to.equal(customMessage);
  });

  it('should create BadException with custom message', () => {
    const customMessage = 'Custom Bad Request';
    const exception = new BadException(customMessage);
    expect(exception).to.be.an.instanceOf(Error);
    expect(exception.code).to.equal(400);
    expect(exception.message).to.equal(customMessage);
  });

  it('should create ForbiddenException with custom message', () => {
    const customMessage = 'Custom Forbidden';
    const exception = new ForbiddenException(customMessage);
    expect(exception).to.be.an.instanceOf(Error);
    expect(exception.code).to.equal(403);
    expect(exception.message).to.equal(customMessage);
  });

  it('should create UnAuthorizedException with custom message', () => {
    const customMessage = 'Custom UNAUTHORIZED';
    const exception = new UnAuthorizedException(customMessage);
    expect(exception).to.be.an.instanceOf(Error);
    expect(exception.code).to.equal(401);
    expect(exception.message).to.equal(customMessage);
  });

  it('should create NotFoundException with custom message', () => {
    const customMessage = 'Custom Not Found';
    const exception = new NotFoundException(customMessage);
    expect(exception).to.be.an.instanceOf(Error);
    expect(exception.code).to.equal(404);
    expect(exception.message).to.equal(customMessage);
  });
});
