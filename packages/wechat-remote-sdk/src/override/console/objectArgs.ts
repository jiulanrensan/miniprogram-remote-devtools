import { originLog } from '@/domain/Runtime'
import {
  getValueType,
  noPropertyDataType,
  dataType,
  generateUUID,
  getObjectValueByPath,
  lowerDataType
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
type Option = { arg: any; key?: string; objectId?: string }

/**
 * object <=> objectId 要有绑定关系
 * ----
 * console.log(object)
 * 以console入参的object作为起点，通过uuid记录其地址
 *
 * 不同层级的objectId`uuid.key1.key2.key3...`的形式记录，多一层嵌套就多一个`.key`
 */
/**
 * 对象对应的id，同一个引用的对象可能console多次
 */
const objectToIdMap = new Map() as Map<object, string>

/**
 * id对应的对象
 */
const idToObjectMap = new Map() as Map<string, object>

function nullArgs({ arg }: { arg: null }) {
  return {
    type: typeof arg,
    subtype: 'null',
    value: arg
  }
}

/**
 * typeof 为 object 类型
 */
const dataTypeFn: Record<string, (option: Option) => any> = {
  object: (options) => {
    const { arg, key, objectId } = options
    const type = getValueType(arg)
    return {
      // 这里的type都要用'object'，subtype才用具体类型，下面preview同理
      type: lowerDataType.object,
      className: type,
      description: type,
      objectId: createObjectId(options),
      preview: {
        type: lowerDataType.object,
        description: type,
        overflow: false,
        properties: Object.keys(arg).map((key) => previewProperties(arg, key))
      }
    }
  },
  array: (options) => {
    const { arg } = options
    const type = getValueType(arg)
    const typeLower = type.toLocaleLowerCase()
    const desc = `${type}(${arg.length})`
    return {
      type: lowerDataType.object,
      subtype: typeLower,
      className: type,
      description: desc,
      objectId: createObjectId(options),
      preview: {
        type: lowerDataType.object,
        subtype: typeLower,
        description: desc,
        overflow: false,
        properties: Object.keys(arg).map((key) => previewProperties(arg, key))
      }
    }
  }
}

function objectArgs(options: Option) {
  const type = getValueType(options.arg)
  const typeLower = type.toLocaleLowerCase()
  const fn = dataTypeFn[typeLower]
  return fn(options)
}
function previewProperties(arg, key) {
  const type = getValueType(arg[key]) as (typeof noPropertyDataType)[number]
  const subtype = type.toLocaleLowerCase()
  const noPro = noPropertyDataType.includes(type)
  return {
    name: key,
    type: subtype,
    value: noPro ? String(arg[key]) : type
  }
}

function createObjectId(options: Option): string {
  const { arg, key, objectId } = options
  if (key) {
    return `${objectId}.${key}`
  }
  if (objectToIdMap.has(arg)) {
    return objectToIdMap.get(arg)!
  }
  const uuid = generateUUID()
  objectToIdMap.set(arg, uuid)
  idToObjectMap.set(uuid, arg)
  return uuid
}

/**
 * objectId会存在'.'分隔
 */
export function getObjectById(objectId: string) {
  const dotIdx = objectId.indexOf('.')
  let realObjectId = ''
  let path = ''
  if (dotIdx === -1) {
    realObjectId = objectId.slice(0)
  } else {
    realObjectId = objectId.slice(0, dotIdx)
    path = objectId.slice(dotIdx + 1)
  }
  const topObject = idToObjectMap.get(realObjectId)
  if (!topObject) {
    originLog('对象不存在')
    return
  }
  if (!path) return topObject
  const target = getObjectValueByPath(topObject, path)
  return target
}

// function createObjectPropertyIds(arg: object, path?: string) {
//   if (getValueType(arg) !== dataType.object) return
//   let uuid = ''
//   if (!objectToIdMap.has(arg)) {
//     uuid = createObjectId(arg)
//   } else {
//     uuid = objectToIdMap.get(arg)!
//   }
//   if (!path) return uuid
//    getObjectValueByPath(arg, path)
// }

export function handleObjectArg(
  arg: object,
  otherOptions?: {
    objectId: string
    key: string
  }
) {
  const type = getValueType(arg) // 'Null'
  // const typeLower = type.toLocaleLowerCase() // 'null
  if (dataType.null === type) {
    return nullArgs({ arg: null })
  }
  const { objectId, key } = otherOptions || {}
  return objectArgs({ arg, key, objectId })
}
