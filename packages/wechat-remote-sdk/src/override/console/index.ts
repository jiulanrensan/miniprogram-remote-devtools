import { Domain } from 'packages/common/src/const/cdp/domain'
import { consoleAPICalledTypeMap, debug, error, info, log, trace, warn } from './api'
import { Runtime } from 'packages/common/src/const/domain/events/Runtime'
import { overrideApi } from 'packages/common/src/utils'

export function overrideConsole(send: any) {
  ;[log, info, warn, error, debug, trace].forEach((fn) => {
    function overrideFunc(...args) {
      send({
        method: Domain[Runtime.consoleAPICalled],
        params: {
          type: consoleAPICalledTypeMap.get(fn),
          args: handleArgs(args),
          executionContextId: 1,
          stackTrace: {
            callFrames: []
          },
          timestamp: new Date().getTime()
        }
      })
    }
    overrideApi({
      target: console,
      apiKey: fn.name,
      overrideFunc
    })
  })
}

function handleArgs(args: Array<any>) {
  return args.map((arg) => {
    return {
      type: typeof arg,
      value: arg
    }
  })
}
