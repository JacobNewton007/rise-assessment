export abstract class BaseEntity<T> {
  constructor(props?: Partial<T>) {
    Object.assign(this, props ?? {});
  }
}
