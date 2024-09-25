import { getValueType, noPropertyDataType, dataType } from '@miniprogram-remote-devtools/common'

/**
 * typeof value === 'object'
 * -------
 *  - Array
 *  - Object
 *  - Map
 *  - Set
 *  - WeakMap
 *  - WeakSet
 *  - Promise
 *  - Proxy
 *  - Error
 *  - RegExp
 *  - Date
 */
type Option = { arg: object; type: string; subtype: string }

function nullArgs({ arg }: { arg: null }) {
  return {
    type: typeof arg,
    subtype: 'null',
    value: arg
  }
}

function objectArgs(options: Option) {
  const { arg, type, subtype } = options
  return {
    type: subtype,
    className: type,
    description: type,
    objectId: `${Math.random()}`,
    preview: {
      type: subtype,
      description: type,
      overflow: false,
      properties: Object.keys(arg).map((key) => objectProperties(arg, key))
    }
  }
}
function objectProperties(arg, key) {
  const type = getValueType(arg[key]) as (typeof noPropertyDataType)[number]
  const subtype = type.toLocaleLowerCase()
  const noPro = noPropertyDataType.includes(type)
  return {
    name: key,
    type: subtype,
    value: noPro ? String(arg[key]) : type
  }
}

export function handleObjectArg(arg: object) {
  const type = getValueType(arg) // 'Null'
  const subtype = type.toLocaleLowerCase() // 'null
  const fn = {
    null: nullArgs,
    object: objectArgs
  }
  return fn[subtype]({ arg, type, subtype })
}
