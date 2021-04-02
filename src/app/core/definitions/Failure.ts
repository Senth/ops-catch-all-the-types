import { Immutable } from './Immutable'

/**
 * A custom type of error that is solely for sending error messages as an output.
 */
export class Failure {
  readonly errors: Immutable<Failure.Info[]>
  constructor(errors: Failure.Info[]) {
    // Remove duplicates
    this.errors = errors.reduce((array, item) => {
      const exists = !!array.find((object) => object.type === item.type && object.data === item.data)
      if (!exists) {
        array.push(item)
      }
      return array
    }, new Array<Failure.Info>())
  }

  static create(type: Failure.Types, data?: {}): Failure {
    return new Failure([{ type: type, data: data }])
  }
}

export namespace Failure {
  export interface Info {
    type: Types
    data?: {}
  }

  export enum Types {
    undefined = 'undefined',
  }
}
