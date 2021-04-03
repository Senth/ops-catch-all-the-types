import { Person } from './Person'
import { Function } from './Function'
import { Direction } from './Direction'
import { Mobility } from './Mobility'
import { Animals } from './Animals'
import { Failure } from '../definitions/Failure'

describe('Person entity', () => {
  const validPerson = new Person({
    name: 'Emma',
    saviorBig: { function: Function.thinking, direction: Direction.extroverted, mobility: Mobility.flexible },
    saviorBalanced: { function: Function.sensory, direction: Direction.extroverted, mobility: Mobility.flexible },
    animals: [Animals.play, Animals.consume, Animals.blast, Animals.sleep],
  })

  test('validate() returns no error when the person is valid', () => {
    const result = validPerson.validate()
    expect(result).toEqual([])
  })

  test('validate() returns error when name is empty', () => {
    const test = new Person({
      ...validPerson,
      name: '',
    })

    const result = test.validate()
    const expected: Failure.Info[] = [{ type: Failure.Types.nameIsEmpty }]
    expect(result).toEqual(expected)
  })

  test('validate() returns error when both saviors use decider or observer functions', () => {
    const testData = [
      {
        big: Function.feeling,
        balanced: Function.feeling,
      },
      {
        big: Function.feeling,
        balanced: Function.thinking,
      },
      {
        big: Function.thinking,
        balanced: Function.thinking,
      },
      {
        big: Function.thinking,
        balanced: Function.feeling,
      },
      {
        big: Function.sensory,
        balanced: Function.sensory,
      },
      {
        big: Function.sensory,
        balanced: Function.ntuition,
      },
      {
        big: Function.ntuition,
        balanced: Function.ntuition,
      },
      {
        big: Function.ntuition,
        balanced: Function.sensory,
      },
    ]

    for (const test of testData) {
      const entity = new Person({
        ...validPerson,
        saviorBig: {
          ...validPerson.saviorBig,
          function: test.big,
        },
        saviorBalanced: {
          ...validPerson.saviorBalanced,
          function: test.balanced,
        },
      })

      const result = entity.validate()
      const expected: Failure.Info[] = [{ type: Failure.Types.functionIsDuplicate }]
      expect(result).toEqual(expected)
    }
  })

  // TODO test case error when animals are not 4 in length

  test('validate() returns error when animals are in invalid order', () => {
    const testData: Person[] = [
      new Person({
        ...validPerson,
        animals: [Animals.play, Animals.sleep, Animals.consume, Animals.blast],
      }),
      new Person({
        ...validPerson,
        animals: [Animals.play, Animals.consume, Animals.consume, Animals.consume],
      }),
      new Person({
        ...validPerson,
        animals: [Animals.consume, Animals.play, Animals.sleep, Animals.blast],
      }),
      new Person({
        ...validPerson,
        saviorBig: { ...validPerson.saviorBig, direction: Direction.introverted },
        animals: [Animals.blast, Animals.play, Animals.sleep, Animals.consume],
      }),
      new Person({
        ...validPerson,
        saviorBig: { ...validPerson.saviorBig, direction: Direction.introverted },
        animals: [Animals.play, Animals.blast, Animals.sleep, Animals.consume],
      }),
      new Person({
        ...validPerson,
        saviorBig: { ...validPerson.saviorBig, direction: Direction.introverted },
        animals: [Animals.sleep, Animals.blast, Animals.play, Animals.consume],
      }),
    ]

    for (const test of testData) {
      const result = test.validate()
      const expected: Failure.Info[] = [{ type: Failure.Types.animalsInvalidOrder }]
      expect(result).toEqual(expected)
    }
  })
})
