import { PersonEditInteractor } from './PersonEditInteractor'
import { PersonEditRepository } from './PersonEditRepository'
import { mock, instance, when, verify } from 'ts-mockito'
import { Person } from '../core/entities/Person'
import { Animals } from '../core/entities/Animals'
import { Direction } from '../core/entities/Direction'
import { Mobility } from '../core/entities/Mobility'
import { Function } from '../core/entities/Function'
import { Failure } from '../core/definitions/Failure'

describe('PersonEditInteractor', () => {
  let interactor: PersonEditInteractor
  let mockRepository: PersonEditRepository

  beforeEach(() => {
    mockRepository = mock<PersonEditRepository>()
  })

  test('Should return the changed person when successfully changed', async () => {
    const validPerson = new Person({
      id: '1',
      name: 'Emma',
      saviorBig: { function: Function.thinking, direction: Direction.extroverted, mobility: Mobility.flexible },
      saviorBalanced: { function: Function.sensory, direction: Direction.extroverted, mobility: Mobility.flexible },
      animals: [Animals.play, Animals.consume, Animals.blast, Animals.sleep],
    })
    const expected = validPerson

    when(mockRepository.personExists(validPerson.id!)).thenResolve(true)
    when(mockRepository.editPerson(validPerson)).thenResolve(expected)
    const repository = instance(mockRepository)
    interactor = new PersonEditInteractor(repository)

    const result = await interactor.execute(validPerson)
    verify(mockRepository.personExists(validPerson.id!)).called()
    verify(mockRepository.editPerson(validPerson)).called()
    expect(result).toEqual(expected)
  })

  test('Should return failure when id is not set', async () => {
    const validPerson = new Person({
      name: 'Emma',
      saviorBig: { function: Function.thinking, direction: Direction.extroverted, mobility: Mobility.flexible },
      saviorBalanced: { function: Function.sensory, direction: Direction.extroverted, mobility: Mobility.flexible },
      animals: [Animals.play, Animals.consume, Animals.blast, Animals.sleep],
    })
    const expected = Failure.create(Failure.Types.idIsNotSet)

    const repository = instance(mockRepository)
    interactor = new PersonEditInteractor(repository)

    const promise = interactor.execute(validPerson)
    await expect(promise).rejects.toEqual(expected)
  })

  test('Should return failure if the person is invalid', async () => {
    const validPerson = new Person({
      id: '1',
      name: 'Emma',
      saviorBig: { function: Function.sensory, direction: Direction.extroverted, mobility: Mobility.flexible },
      saviorBalanced: { function: Function.sensory, direction: Direction.extroverted, mobility: Mobility.flexible },
      animals: [Animals.play, Animals.consume, Animals.blast, Animals.sleep],
    })
    const expected = Failure.create(Failure.Types.functionIsDuplicate)

    const repository = instance(mockRepository)
    interactor = new PersonEditInteractor(repository)

    const promise = interactor.execute(validPerson)
    await expect(promise).rejects.toEqual(expected)
  })

  test('Should return failure if the person does not exist', async () => {
    const validPerson = new Person({
      id: '1',
      name: 'Emma',
      saviorBig: { function: Function.thinking, direction: Direction.extroverted, mobility: Mobility.flexible },
      saviorBalanced: { function: Function.sensory, direction: Direction.extroverted, mobility: Mobility.flexible },
      animals: [Animals.play, Animals.consume, Animals.blast, Animals.sleep],
    })
    const expected = Failure.create(Failure.Types.personDoesNotExist)

    when(mockRepository.personExists(validPerson.id!)).thenResolve(false)
    const repository = instance(mockRepository)
    interactor = new PersonEditInteractor(repository)

    const promise = interactor.execute(validPerson)
    verify(mockRepository.personExists(validPerson.id!)).called()
    await expect(promise).rejects.toEqual(expected)
  })
})
