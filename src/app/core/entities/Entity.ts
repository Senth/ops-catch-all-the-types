import { Failure } from '../definitions/Failure'

export interface Entity {
  /**
   * Validate the entity so that it has correct values
   * @return all errors, or empty list if the entity is valid
   */
  validate(): Failure.Info[]
}
