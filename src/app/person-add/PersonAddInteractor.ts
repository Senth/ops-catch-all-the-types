import { Failure } from '../core/definitions/Failure'
import { Interactor } from '../core/definitions/Interactor'
import { Person } from '../core/entities/Person'
import { PersonAddRepository } from './PersonAddRepository'

export class PersonAddInteractor extends Interactor<Person, Person, PersonAddRepository> {
  constructor(repository: PersonAddRepository) {
    super(repository)
  }

  /**
   * Adds a new typed person
   * @return successfully created person
   * @throws {Failure} when validation error
   */
  async execute(input: Person): Promise<Person> {
    this.input = input

    if (input.id !== undefined) {
      throw Failure.create(Failure.Types.idIsAlreadySet)
    }

    const errors = input.validate()
    if (errors.length > 0) {
      throw new Failure(errors)
    }

    return this.repository.addPerson(input)
  }
}
