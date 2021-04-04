import { Person } from './Person'
import { Function } from './Function'
import { Direction } from './Direction'
import { Mobility } from './Mobility'
import { Animals } from './Animals'
import { Failure } from '../definitions/Failure'

describe('Person.validate()', () => {
  const validPerson = new Person({
    name: 'Emma',
    saviorBig: { function: Function.thinking, direction: Direction.extroverted, mobility: Mobility.flexible },
    saviorBalanced: { function: Function.sensory, direction: Direction.extroverted, mobility: Mobility.flexible },
    animals: [Animals.play, Animals.consume, Animals.blast, Animals.sleep],
  })

  test('no errors when the person is valid', () => {
    const result = validPerson.validate()
    expect(result).toEqual([])
  })

  test('name -> error when name is empty', () => {
    const test = new Person({ ...validPerson, name: '' })
    const expected: Failure.Info[] = [{ type: Failure.Types.nameIsEmpty }]

    const result = test.validate()
    expect(result).toEqual(expected)
  })

  describe('animals', () => {
    test('error when animals is not of length 4 ', () => {
      const test = new Person({ ...validPerson, animals: [] })
      const expected: Failure.Info[] = [{ type: Failure.Types.animalsNotFour }]

      const result = test.validate()
      expect(result).toEqual(expected)
    })

    test('duplicate animals when same animal is used more than once', () => {
      const test = new Person({
        ...validPerson,
        animals: [Animals.play, Animals.consume, Animals.consume, Animals.consume],
      })
      const expected: Failure.Info[] = [{ type: Failure.Types.animalsIsDuplicate }]

      const result = test.validate()
      expect(result).toEqual(expected)
    })

    describe.each([
      [
        'consume is first when saviors are extroverted',
        new Person({
          ...validPerson,
          animals: [Animals.consume, Animals.play, Animals.sleep, Animals.blast],
        }),
      ],
      [
        'blast is first when saviors are extroverted',
        new Person({
          ...validPerson,
          animals: [Animals.blast, Animals.play, Animals.sleep, Animals.consume],
        }),
      ],
      [
        'sleep is first when saviors are extroverted',
        new Person({
          ...validPerson,
          animals: [Animals.sleep, Animals.consume, Animals.play, Animals.blast],
        }),
      ],
      [
        'blast is first when saviors are introverted',
        new Person({
          ...validPerson,
          saviorBig: { ...validPerson.saviorBig, direction: Direction.introverted },
          saviorBalanced: { ...validPerson.saviorBalanced, direction: Direction.introverted },
          animals: [Animals.blast, Animals.play, Animals.sleep, Animals.consume],
        }),
      ],
      [
        'play is first when saviors are introverted',
        new Person({
          ...validPerson,
          saviorBig: { ...validPerson.saviorBig, direction: Direction.introverted },
          saviorBalanced: { ...validPerson.saviorBalanced, direction: Direction.introverted },
          animals: [Animals.play, Animals.blast, Animals.sleep, Animals.consume],
        }),
      ],
      [
        'consume is first when saviors are introverted',
        new Person({
          ...validPerson,
          saviorBig: { ...validPerson.saviorBig, direction: Direction.introverted },
          saviorBalanced: { ...validPerson.saviorBalanced, direction: Direction.introverted },
          animals: [Animals.consume, Animals.play, Animals.sleep, Animals.blast],
        }),
      ],
      [
        'consume is first when decider is extroverted and observer is introverted',
        new Person({
          ...validPerson,
          saviorBalanced: { ...validPerson.saviorBalanced, direction: Direction.introverted },
          animals: [Animals.consume, Animals.play, Animals.sleep, Animals.blast],
        }),
      ],
      [
        'play is first when decider is extroverted and observer is introverted',
        new Person({
          ...validPerson,
          saviorBalanced: { ...validPerson.saviorBalanced, direction: Direction.introverted },
          animals: [Animals.play, Animals.blast, Animals.sleep, Animals.consume],
        }),
      ],
      [
        'sleep is first when decider is extroverted and observer is introverted',
        new Person({
          ...validPerson,
          saviorBalanced: { ...validPerson.saviorBalanced, direction: Direction.introverted },
          animals: [Animals.sleep, Animals.blast, Animals.play, Animals.consume],
        }),
      ],
      [
        'blast is first when decider is introverted and observer is extroverted',
        new Person({
          ...validPerson,
          saviorBig: { ...validPerson.saviorBig, direction: Direction.introverted },
          animals: [Animals.blast, Animals.play, Animals.sleep, Animals.consume],
        }),
      ],
      [
        'play is first when decider is introverted and observer is extroverted',
        new Person({
          ...validPerson,
          saviorBig: { ...validPerson.saviorBig, direction: Direction.introverted },
          animals: [Animals.play, Animals.blast, Animals.sleep, Animals.consume],
        }),
      ],
      [
        'sleep is first when decider is introverted and observer is extroverted',
        new Person({
          ...validPerson,
          saviorBig: { ...validPerson.saviorBig, direction: Direction.introverted },
          animals: [Animals.sleep, Animals.blast, Animals.play, Animals.consume],
        }),
      ],
    ])('invalid first animal when', (name, input) => {
      test(name, () => {
        const result = input.validate()
        const expected: Failure.Info[] = [{ type: Failure.Types.animalsInvalidFirstAnimal }]
        expect(result).toEqual(expected)
      })
    })

    describe.each([
      [
        'first is play',
        new Person({
          ...validPerson,
          saviorBig: { ...validPerson.saviorBig, direction: Direction.extroverted },
          saviorBalanced: { ...validPerson.saviorBalanced, direction: Direction.extroverted },
          animals: [Animals.play, Animals.sleep, Animals.consume, Animals.blast],
        }),
      ],
      [
        'first is sleep',
        new Person({
          ...validPerson,
          saviorBig: { ...validPerson.saviorBig, direction: Direction.introverted },
          saviorBalanced: { ...validPerson.saviorBalanced, direction: Direction.introverted },
          animals: [Animals.sleep, Animals.play, Animals.consume, Animals.blast],
        }),
      ],
      [
        'first is consume',
        new Person({
          ...validPerson,
          saviorBig: { ...validPerson.saviorBig, direction: Direction.introverted },
          saviorBalanced: { ...validPerson.saviorBalanced, direction: Direction.extroverted },
          animals: [Animals.consume, Animals.blast, Animals.play, Animals.sleep],
        }),
      ],
      [
        'first is blast',
        new Person({
          ...validPerson,
          saviorBig: { ...validPerson.saviorBig, direction: Direction.extroverted },
          saviorBalanced: { ...validPerson.saviorBalanced, direction: Direction.introverted },
          animals: [Animals.blast, Animals.consume, Animals.play, Animals.sleep],
        }),
      ],
    ])('invalid second animal when', (name, input) => {
      test(name, () => {
        const result = input.validate()
        const expected: Failure.Info[] = [{ type: Failure.Types.animalsInvalidSecondAnimal }]
        expect(result).toEqual(expected)
      })
    })
  })

  describe.each([
    [
      'feeling is used in both saviors',
      new Person({
        ...validPerson,
        saviorBig: { ...validPerson.saviorBig, function: Function.feeling },
        saviorBalanced: { ...validPerson.saviorBalanced, function: Function.feeling },
      }),
    ],
    [
      'feeling and thinking is used in both saviors',
      new Person({
        ...validPerson,
        saviorBig: { ...validPerson.saviorBig, function: Function.feeling },
        saviorBalanced: { ...validPerson.saviorBalanced, function: Function.thinking },
      }),
    ],
    [
      'thinking is used in both saviors',
      new Person({
        ...validPerson,
        saviorBig: { ...validPerson.saviorBig, function: Function.thinking },
        saviorBalanced: { ...validPerson.saviorBalanced, function: Function.thinking },
      }),
    ],
    [
      'thinking and feeling is used in both saviors',
      new Person({
        ...validPerson,
        saviorBig: { ...validPerson.saviorBig, function: Function.thinking },
        saviorBalanced: { ...validPerson.saviorBalanced, function: Function.feeling },
      }),
    ],
    [
      'sensory is used in both saviors',
      new Person({
        ...validPerson,
        saviorBig: { ...validPerson.saviorBig, function: Function.sensory },
        saviorBalanced: { ...validPerson.saviorBalanced, function: Function.sensory },
      }),
    ],
    [
      'sensory and intuition is used in both saviors',
      new Person({
        ...validPerson,
        saviorBig: { ...validPerson.saviorBig, function: Function.sensory },
        saviorBalanced: { ...validPerson.saviorBalanced, function: Function.intuition },
      }),
    ],
    [
      'intuition is used in both saviors',
      new Person({
        ...validPerson,
        saviorBig: { ...validPerson.saviorBig, function: Function.intuition },
        saviorBalanced: { ...validPerson.saviorBalanced, function: Function.intuition },
      }),
    ],
    [
      'intuition and sensory is used in both saviors',
      new Person({
        ...validPerson,
        saviorBig: { ...validPerson.saviorBig, function: Function.intuition },
        saviorBalanced: { ...validPerson.saviorBalanced, function: Function.sensory },
      }),
    ],
  ])('function -> is duplicate when', (name, input) => {
    test(name, () => {
      const result = input.validate()
      const expected: Failure.Info[] = [{ type: Failure.Types.functionIsDuplicate }]
      expect(result).toEqual(expected)
    })
  })
})
