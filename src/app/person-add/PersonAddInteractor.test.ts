import { Person } from '../core/entities/Person'
import { PersonAddInteractor } from './PersonAddInteractor'
import { PersonAddRepository } from './PersonAddRepository'
import { instance, mock, when } from 'ts-mockito'
import { Animals } from '../core/entities/Animals'
import { Function } from '../core/entities/Function'
import { Direction } from '../core/entities/Direction'
import { Mobility } from '../core/entities/Mobility'
import { Failure } from '../core/definitions/Failure'

describe('PersonAddInteractor', () => {
  let interactor: PersonAddInteractor
  let mockRepository: PersonAddRepository

  beforeEach(() => {
    mockRepository = mock<PersonAddRepository>()
  })

  test('Should return a person with ID when successfully added', async () => {
    const validPerson = new Person({
      name: 'Emma',
      saviorBig: { function: Function.thinking, direction: Direction.extroverted, mobility: Mobility.flexible },
      saviorBalanced: { function: Function.sensory, direction: Direction.extroverted, mobility: Mobility.flexible },
      animals: [Animals.play, Animals.consume, Animals.blast, Animals.sleep],
    })
    const expected = new Person({
      ...validPerson,
      id: '1',
    })

    when(mockRepository.addPerson(validPerson)).thenResolve(expected)
    const repository = instance(mockRepository)
    interactor = new PersonAddInteractor(repository)

    const result = await interactor.execute(validPerson)
    expect(result).toEqual(expected)
  })

  test('Should return failure when person is invalid', async () => {
    const input = new Person({
      name: 'Emma',
      saviorBig: { function: Function.sensory, direction: Direction.extroverted, mobility: Mobility.flexible },
      saviorBalanced: { function: Function.sensory, direction: Direction.extroverted, mobility: Mobility.flexible },
      animals: [Animals.play, Animals.consume, Animals.blast, Animals.sleep],
    })
    const expected = Failure.create(Failure.Types.functionIsDuplicate)
    const repository = instance(mockRepository)
    interactor = new PersonAddInteractor(repository)

    const promise = interactor.execute(input)
    await expect(promise).rejects.toEqual(expected)
  })

  test('Should return failure if the person already has an ID set', async () => {
    const input = new Person({
      id: '1',
      name: 'Emma',
      saviorBig: { function: Function.thinking, direction: Direction.extroverted, mobility: Mobility.flexible },
      saviorBalanced: { function: Function.sensory, direction: Direction.extroverted, mobility: Mobility.flexible },
      animals: [Animals.play, Animals.consume, Animals.blast, Animals.sleep],
    })
    const expected = Failure.create(Failure.Types.idIsAlreadySet)
    const repository = instance(mockRepository)
    interactor = new PersonAddInteractor(repository)

    const promise = interactor.execute(input)
    await expect(promise).rejects.toEqual(expected)
  })
})
