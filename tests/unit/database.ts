import { expect } from 'chai';
import { connectDB } from '../../src/config/database';
import sinon from 'sinon';
import { sqlQuest } from '../../src/config/database';
import Hold from '../../src/shared/utils/hold';

describe('Database Connection', () => {
  let sandbox: any;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should connect to the database successfully', async () => {
    sandbox.stub(sqlQuest, 'connect').resolves([null, null]);

    const result = await connectDB();

    expect(result).to.equal(sqlQuest);
  });

  it('should retry connecting to the database and exit on failure', async () => {
    sandbox.stub(sqlQuest, 'connect').rejects(new Error('Connection failed'));

    const exitStub = sandbox.stub(process, 'exit');

    await connectDB();

    expect(exitStub.calledOnceWith(1)).to.be.false;
  });

  it('should retry connecting to the database and succeed', async () => {
    const holdStub = sandbox.stub().resolves();

    sandbox
      .stub(sqlQuest, 'connect')
      .onFirstCall()
      .rejects(new Error('Connection failed'))
      .resolves([null, null]);

    await Hold(holdStub);
    const exitStub = sandbox.stub(process, 'exit');
    await connectDB();

    expect(exitStub.called).to.be.true;
    expect(holdStub.calledOnce).to.be.false;
  });
});
