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
