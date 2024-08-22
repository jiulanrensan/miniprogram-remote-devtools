import { Base } from './base'
export const originLog = console.log
/**
 * Runtime
 * consoleAPICalled
 * exceptionThrown
 */
export class Runtime extends Base {
  public init() {
    this.overrideConsole()
  }
  private overrideConsole() {
    const { log } = console
    console.log = (...args: any[]) => {
      log.apply(console, args)
      this.send({
        method: '',
        params: {
          type: 'log',
          args: [
            {
              type: 'number',
              value: 111,
              description: '111'
            }
          ],
          executionContextId: 1,
          timestamp: new Date().getTime()
        }
      })
    }
  }
}
