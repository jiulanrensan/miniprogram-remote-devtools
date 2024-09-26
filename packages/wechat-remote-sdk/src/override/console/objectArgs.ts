import {
  getValueType,
  noPropertyDataType,
  dataType,
  generateUUID,
  getObjectValueByPath
} from '@miniprogram-remote-devtools/common'

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

/**
 * object <=> objectId
 * ----
 * console.log(object)
 * 以console入参的object作为起点，通过uuid记录其地址
 * object里的属性以`uuid.key1.key2.key3...`的形式记录，多一层嵌套就多一个`.key`
 */
const objectIdMap = new Map() as Map<object, string>

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
    objectId: createObjectId(arg),
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

function createObjectId(arg: object): string {
  if (objectIdMap.has(arg)) {
    return objectIdMap.get(arg)!
  }
  const uuid = generateUUID()
  objectIdMap.set(arg, uuid)
  return uuid
}

// function createObjectPropertyIds(arg: object, path?: string) {
//   if (getValueType(arg) !== dataType.object) return
//   let uuid = ''
//   if (!objectIdMap.has(arg)) {
//     uuid = createObjectId(arg)
//   } else {
//     uuid = objectIdMap.get(arg)!
//   }
//   if (!path) return uuid
//    getObjectValueByPath(arg, path)
// }

export function handleObjectArg(arg: object) {
  const type = getValueType(arg) // 'Null'
  const subtype = type.toLocaleLowerCase() // 'null
  const fn = {
    null: nullArgs,
    object: objectArgs
  }
  return fn[subtype]({ arg, type, subtype })
}
