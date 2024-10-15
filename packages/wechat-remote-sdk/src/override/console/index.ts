import {
  AnyFunction,
  dataType,
  Domain,
  getValueType,
  lowerDataType
} from '@miniprogram-remote-devtools/common'
import { consoleAPICalledTypeMap, debug, error, group, groupEnd, info, log, warn } from './api'
import { Runtime } from '@miniprogram-remote-devtools/common'
import { overrideApi } from '@miniprogram-remote-devtools/common'
import { handleObjectArg } from './objectArgs'

type Args = Array<any>

export function overrideConsole(send: any) {
  ;[log, info, warn, error, debug, group, groupEnd].forEach((fn) => {
    function sendConsole(...args) {
      const packageArgs = handleConsoleArgs(args, fn.name)
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

function handleConsoleArgs(args: Args, funcName?: string) {
  if (!Array.isArray(args)) return
  if (!args.length && funcName) {
    const noArgsFn = {
      group: handleNoArgsConsoleGroup,
      groupEnd: handleNoArgsConsoleGroup
    }[funcName]
    if (!noArgsFn) return
    return noArgsFn(funcName)
  }
  return args.map((arg) => handleArgs(arg))
}

function handleNoArgsConsoleGroup(funcName: string) {
  // group, groupEnd 没有参数时，默认取 function name
  return {
    type: 'string',
    value: funcName
  }
}

export function handleArgs(
  arg: object,
  otherOptions?: {
    objectId: string
    key: string
  }
) {
  const fn = handleArgsMap[typeof arg]
  if (!fn) {
    log('unsupported type', typeof arg)
    return {}
  }
  return fn(arg, otherOptions)
}

export const handleArgsMap = {
  [lowerDataType.string]: (arg) => {
    return {
      type: lowerDataType.string,
      value: arg
    }
  },

  [lowerDataType.number]: (arg) => {
    return {
      type: lowerDataType.number,
      value: arg,
      description: String(arg)
    }
  },

  [lowerDataType.boolean]: (arg) => {
    return {
      type: lowerDataType.boolean,
      value: arg
    }
  },

  [lowerDataType.undefined]: () => {
    return {
      type: 'undefined'
    }
  },
  // 微信小程序暂不支持
  [lowerDataType.bigint]: (arg) => {
    const v = `${arg.toString()}n`
    return {
      type: lowerDataType.bigint,
      unserializableValue: v,
      description: v
    }
  },
  [lowerDataType.symbol]: (arg) => {
    return {
      type: lowerDataType.symbol,
      description: arg.toString()
    }
  },
  [lowerDataType.function]: (arg) => {
    return {
      type: lowerDataType.function,
      className: getValueType(arg),
      description: arg.toString()
    }
  },
  [lowerDataType.object]: handleObjectArg
}
