import { Person } from '../core/entities/Person'

export interface PersonAddRepository {
  addPerson(person: Person): Promise<Person>
}
