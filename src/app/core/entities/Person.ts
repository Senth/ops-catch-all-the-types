import { Failure } from '../definitions/Failure'
import { Animals } from './Animals'
import { Entity } from './Entity'
import { FunctionType } from './FunctionType'

export interface PersonData {
  readonly id?: string
  readonly name: string
  readonly saviorBig: FunctionType
  readonly saviorBalanced: FunctionType
  readonly animals: Animals[]
}

export class Person implements Entity, PersonData {
  readonly id?: string
  readonly name: string
  readonly saviorBig: FunctionType
  readonly saviorBalanced: FunctionType
  readonly animals: Animals[]

  constructor(data: PersonData) {
    this.id = data.id
    this.name = data.name
    this.saviorBig = data.saviorBig
    this.saviorBalanced = data.saviorBalanced
    this.animals = data.animals
  }

  validate(): Failure.Info[] {
    const errors: Failure.Info[] = []

    if (this.name.length == 0) {
      errors.push({ type: Failure.Types.nameIsEmpty })
    }

    return errors
  }
}
