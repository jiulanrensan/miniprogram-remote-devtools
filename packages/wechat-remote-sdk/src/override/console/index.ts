import { AnyFunction, Domain, getValueType } from '@miniprogram-remote-devtools/common'
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
    const fn = handleArgsMap[typeof arg]
    if (!fn) {
      log('unsupported type', typeof arg)
      return {}
    }
    return fn(arg)
  })
}

function handleNoArgsConsoleGroup(funcName: string) {
  // group, groupEnd 没有参数时，默认取 function name
  return {
    type: 'string',
    value: funcName
  }
}

const handleArgsMap = {
  string: (arg: string) => {
    return {
      type: 'string',
      value: arg
    }
  },

  number: (arg: number) => {
    return {
      type: 'number',
      value: arg,
      description: String(arg)
    }
  },

  boolean: (arg: boolean) => {
    return {
      type: 'boolean',
      value: arg
    }
  },

  undefined: () => {
    return {
      type: 'undefined'
    }
  },
  // 微信小程序暂不支持
  bigInt: (arg: bigint) => {
    const v = `${arg.toString()}n`
    return {
      type: 'bigint',
      unserializableValue: v,
      description: v
    }
  },
  symbol: (arg: symbol) => {
    return {
      type: 'symbol',
      description: arg.toString()
    }
  },
  function: (arg: AnyFunction) => {
    return {
      type: 'function',
      className: getValueType(arg),
      description: arg.toString()
    }
  },
  object: (arg: object) => {
    return {
      type: 'object',
      className: getValueType(arg),
      description: JSON.stringify(arg)
    }
  }
}
