import { Direction } from './Direction'
import { Function } from './Function'
import { Mobility } from './Mobility'

export interface FunctionType {
  readonly function: Function
  readonly direction: Direction
  readonly mobility: Mobility
}
