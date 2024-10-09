import { AnyFunction } from '../type'
export * from './type'

export function overrideApi({
  target,
  apiKey,
  overrideFunc,
  order = 'after'
}: {
  target: Record<string, any>
  apiKey: string
  overrideFunc: AnyFunction
  order?: 'before' | 'after'
}) {
  const originHook = target[apiKey]
  target[apiKey] = function (...args) {
    if (order === 'before') overrideFunc(...args)
    // 不一定有这个钩子，所以要判断一下
    if (originHook) originHook.apply(target, args)
    if (order === 'after') overrideFunc(...args)
  }
}

export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function getObjectValueByPath(obj: object, path: string, defaultValue = void 0) {
  const keysList = path.split('.')
  let temp: any = obj
  for (let i = 0; i < keysList.length; i++) {
    const key = keysList[i]
    if (Object.prototype.hasOwnProperty.call(temp, key)) {
      temp = temp[keysList[i]]
    } else {
      temp = defaultValue
      break
    }
  }
  return temp
}
