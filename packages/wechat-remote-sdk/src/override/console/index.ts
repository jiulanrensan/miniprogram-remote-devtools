import { Domain } from '@miniprogram-remote-devtools/common'
import { consoleAPICalledTypeMap, debug, error, info, log, warn } from './api'
import { Runtime } from '@miniprogram-remote-devtools/common'
import { overrideApi } from '@miniprogram-remote-devtools/common'

export function overrideConsole(send: any) {
  ;[log, info, warn, error, debug].forEach((fn) => {
    function overrideFunc(...args) {
      send({
        method: Runtime.events.consoleAPICalled,
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
