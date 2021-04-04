import { Failure } from '../core/definitions/Failure'
import { Interactor } from '../core/definitions/Interactor'
import { Person } from '../core/entities/Person'
import { PersonEditRepository } from './PersonEditRepository'

export class PersonEditInteractor extends Interactor<Person, Person, PersonEditRepository> {
  constructor(repository: PersonEditRepository) {
    super(repository)
  }

  /**
   * Edit typed person
   * @return {Promise.<Person>}
   * @throws
   */
  async execute(input: Person): Promise<Person> {
    this.input = input

    if (input.id === undefined) {
      throw Failure.create(Failure.Types.idIsNotSet)
    }

    const errors = input.validate()
    if (errors.length > 0) {
      throw new Failure(errors)
    }

    const personExists = await this.repository.personExists(input.id!)
    if (!personExists) {
      throw Failure.create(Failure.Types.personDoesNotExist)
    }

    return this.repository.editPerson(input)
  }
}
