import { Failure } from '../definitions/Failure'
import { Animals } from './Animals'
import { Entity } from './Entity'
import { Function } from './Function'
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
    if (
      (this.saviorBig.function == Function.feeling && this.saviorBalanced.function == Function.feeling) ||
      (this.saviorBig.function == Function.feeling && this.saviorBalanced.function == Function.thinking) ||
      (this.saviorBig.function == Function.thinking && this.saviorBalanced.function == Function.thinking) ||
      (this.saviorBig.function == Function.thinking && this.saviorBalanced.function == Function.feeling) ||
      (this.saviorBig.function == Function.sensory && this.saviorBalanced.function == Function.sensory) ||
      (this.saviorBig.function == Function.sensory && this.saviorBalanced.function == Function.intuition) ||
      (this.saviorBig.function == Function.intuition && this.saviorBalanced.function == Function.intuition) ||
      (this.saviorBig.function == Function.intuition && this.saviorBalanced.function == Function.sensory)
    ) {
      errors.push({ type: Failure.Types.functionIsDuplicate })
    }
    if (this.animals.length != 4) {
      errors.push({ type: Failure.Types.animalsNotFour })
    }

    return errors
  }
}
