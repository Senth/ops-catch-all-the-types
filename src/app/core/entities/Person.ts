import { Failure } from '../definitions/Failure'
import { Animals } from './Animals'
import { Entity } from './Entity'
import { FunctionType } from './FunctionType'

export interface PersonData {
  readonly name: string
  readonly saviorBig: FunctionType
  readonly saviorBalanced: FunctionType
  readonly animals: Animals[]
}

export class Person extends Entity implements PersonData {
  readonly name: string
  readonly saviorBig: FunctionType
  readonly saviorBalanced: FunctionType
  readonly animals: Animals[]

  constructor(data: PersonData) {
    super()
    this.name = data.name
    this.saviorBig = data.saviorBig
    this.saviorBalanced = data.saviorBalanced
    this.animals = data.animals
  }

  validate(): Failure.Info[] {
    const errors = super.validate()

    return errors
  }
}
