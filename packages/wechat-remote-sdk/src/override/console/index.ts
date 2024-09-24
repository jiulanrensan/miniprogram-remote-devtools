import { Domain } from '@miniprogram-remote-devtools/common'
import { consoleAPICalledTypeMap, debug, error, group, groupEnd, info, log, warn } from './api'
import { Runtime } from '@miniprogram-remote-devtools/common'
import { overrideApi } from '@miniprogram-remote-devtools/common'

type Args = Array<any>

export function overrideConsole(send: any) {
  ;[log, info, warn, error, debug, group, groupEnd].forEach((fn) => {
    function sendConsole(...args) {
      const packageArgs = handleArgs(args, fn.name)
      if (packageArgs)
        send({
          method: Runtime.events.consoleAPICalled,
          params: {
            type: consoleAPICalledTypeMap.get(fn),
            args: packageArgs,
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
      overrideFunc: sendConsole
    })
  })
}

function handleArgs(args: Args, funcName: string) {
  if (!Array.isArray(args)) return
  if (!args.length) {
    const noArgsFn = {
      group: handleNoArgsConsoleGroup,
      groupEnd: handleNoArgsConsoleGroup
    }[funcName]
    if (!noArgsFn) return
    return noArgsFn(funcName)
  }
  return args.map((arg) => {
    return {
      type: typeof arg,
      value: arg
    }
  })
}

function handleNoArgsConsoleGroup(funcName: string) {
  // group, groupEnd 没有参数时，默认取 function name
  return {
    type: 'string',
    value: funcName
  }
}
