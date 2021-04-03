import { Failure } from '../definitions/Failure'
import { Animals } from './Animals'
import { Direction } from './Direction'
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

    // Name
    if (this.name.length == 0) {
      errors.push({ type: Failure.Types.nameIsEmpty })
    }

    // Functions
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

    // Animals - Length
    if (this.animals.length != 4) {
      errors.push({ type: Failure.Types.animalsNotFour })
    } else {
      // Animals - invalid first animal
      if (
        (this.animals[0] == Animals.play &&
          (this.saviorBig.direction == Direction.introverted ||
            this.saviorBalanced.direction == Direction.introverted)) ||
        (this.animals[0] == Animals.sleep &&
          (this.saviorBig.direction == Direction.extroverted ||
            this.saviorBalanced.direction == Direction.extroverted)) ||
        (this.animals[0] == Animals.consume &&
          (this.getDeciderSavior().direction == Direction.extroverted ||
            this.getObserverSavior().direction == Direction.introverted)) ||
        (this.animals[0] == Animals.blast &&
          (this.getDeciderSavior().direction == Direction.introverted ||
            this.getObserverSavior().direction == Direction.extroverted))
      ) {
        errors.push({ type: Failure.Types.animalsInvalidFirstAnimal })
      }

      if (
        (this.animals[0] == Animals.play && this.animals[1] == Animals.sleep) ||
        (this.animals[0] == Animals.sleep && this.animals[1] == Animals.play) ||
        (this.animals[0] == Animals.consume && this.animals[1] == Animals.blast) ||
        (this.animals[0] == Animals.blast && this.animals[1] == Animals.consume)
      ) {
        // Animals - invalid second animal
        errors.push({ type: Failure.Types.animalsInvalidSecondAnimal })
      }

      // Animals - Duplicate animals
      for (let i = 0; i < this.animals.length; i++) {
        for (let j = i + 1; j < this.animals.length; j++) {
          if (this.animals[i] == this.animals[j]) {
            errors.push({ type: Failure.Types.animalsIsDuplicate })
            i = j = this.animals.length
          }
        }
      }
    }

    return errors
  }

  isSaviorBigDecider(): boolean {
    return this.saviorBig.function == Function.feeling || this.saviorBig.function == Function.thinking
  }

  getDeciderSavior(): FunctionType {
    if (this.isSaviorBigDecider()) {
      return this.saviorBig
    } else {
      return this.saviorBalanced
    }
  }

  getObserverSavior(): FunctionType {
    if (this.isSaviorBigDecider()) {
      return this.saviorBalanced
    } else {
      return this.saviorBig
    }
  }
}
