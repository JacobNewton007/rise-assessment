import { expect } from 'chai';
import { CreateNullClass } from '../../src/shared/utils/null-class';

describe('CreateNullClass', () => {
  it('should create a null class instance of specified type', () => {
    const result = CreateNullClass<string>();
    expect(result).to.be.null;
  });

  it('should create a null class instance of different type', () => {
    const result = CreateNullClass<number>();
    expect(result).to.be.null;
  });
});
