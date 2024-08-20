import { Domain, Events, Methods } from '@/common/const/domain'
import { Base } from './base'

/**
 * Runtime
 * consoleAPICalled
 * exceptionThrown
 */
export class Console extends Base {
  public enable() {
    this.send({
      method: [Methods[Domain.Runtime].enable]
    })
  }
  public init() {
    this.override()
  }
  private override() {
    const { log } = console
    console.log = (...args: any[]) => {
      log.apply(console, args)
      this.send({
        method: Events[Domain.Runtime].consoleAPICalled,
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
