import {
  Domain,
  getValueType,
  lowerDataType,
  noPropertyDataType,
  Runtime as RuntimeDomain
} from '@miniprogram-remote-devtools/common'
import { handleArgs, overrideConsole } from '../override/console'
import { Base } from './base'
import { getObjectById } from '@/override/console/objectArgs'
export const originLog = console.log

/**
 * Runtime
 * consoleAPICalled
 * exceptionThrown
 */
export class Runtime extends Base {
  static domain = Domain.Runtime
  public init() {
    // 绑定this
    overrideConsole(super.send.bind(this))
    super.subscribe({
      [RuntimeDomain.method.enable]: ({ id }) => {
        super.send({ id })
      },
      [RuntimeDomain.method.getProperties]: ({ id, params }) => {
        // ownProperties 为 false 时会去获取原型链上的属性，现在只处理获取本身属性的场景
        const { objectId, ownProperties } = params as { objectId: string; ownProperties: boolean }
        const target = getObjectById(objectId)
        const descriptors = Object.getOwnPropertyDescriptors(target)
        const res = {
          result: Object.keys(descriptors).map((key) => {
            const obj = target[key]
            return {
              ...descriptors[key],
              name: key,
              value: handleArgs(obj, { key, objectId }),
              isOwn: true
            }
          })
        }
        if (ownProperties) {
          Object.assign(res, {
            internalProperties: [
              {
                name: '[[Prototype]]',
                value: {
                  type: 'object',
                  className: 'Object',
                  description: 'Object',
                  objectId: ''
                }
              }
            ]
          })
        }
        super.send({
          id,
          result: res
        })
      }
    })
  }
}
