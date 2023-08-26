import { expect } from 'chai';
import { BaseEntity } from '../../src/shared/utils/base-entity';

class TestEntity extends BaseEntity<{ id: number; name: string }> {}

describe('BaseEntity', () => {
  it('should assign properties correctly', () => {
    // Arrange
    const props = { id: 1, name: 'John' };

    // Act
    const entity = new TestEntity(props);

    // Assert
    expect(entity).to.deep.equal(props);
  });

  it('should assign properties correctly with partial props', () => {
    // Arrange
    const existingProps = { id: 1, name: 'John' };
    const newProps = { name: 'Doe' };
    const expected = { id: 1, name: 'Doe' };

    // Act
    const entity = new TestEntity(existingProps);
    Object.assign(entity, newProps);

    // Assert
    expect(entity).to.deep.equal(expected);
  });

  it('should assign properties correctly with no props', () => {
    // Arrange

    // Act
    const entity = new TestEntity();

    // Assert
    expect(entity).to.deep.equal({});
  });

  // ... other test cases ...
});
