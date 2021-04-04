import { Person } from '../core/entities/Person'

export interface PersonEditRepository {
  editPerson(person: Person): Promise<Person>
  personExists(id: string): Promise<boolean>
}
