import { overrideConsole } from '../override/console'
import { Base } from './base'
export const originLog = console.log

/**
 * Runtime
 * consoleAPICalled
 * exceptionThrown
 */
export class Runtime extends Base {
  public init() {
    overrideConsole(this.send)
  }
}
