import {
  Domain,
  getValueType,
  noPropertyDataType,
  Runtime as RuntimeDomain
} from '@miniprogram-remote-devtools/common'
import { overrideConsole } from '../override/console'
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
        function addValue(options: {
          target: object
          key: string
          objectId: string
          type: (typeof noPropertyDataType)[number]
        }) {
          const { target, key, objectId, type } = options
          const obj = target[key]
          const result = {
            type: type.toLocaleLowerCase(),
            description: String(obj)
          }
          if (noPropertyDataType.includes(type)) {
            return {
              ...result,
              value: obj
            }
          }
          return {
            type: type.toLocaleLowerCase(),
            description: type,
            className: type,
            objectId: `${objectId}.${key}`,
            preview: {
              type: type.toLocaleLowerCase(),
              description: type,
              overflow: false,
              properties: Object.keys(obj).map((subKey) => {
                const subType = getValueType(obj) as (typeof noPropertyDataType)[number]
                return {
                  name: subKey,
                  type: subType.toLocaleLowerCase(),
                  value: noPropertyDataType.includes(subType) ? String(obj[subKey]) : subType
                }
              })
            }
          }
        }
        const res = {
          result: Object.keys(target).map((key) => {
            const descriptors = Object.getOwnPropertyDescriptor(target, key)
            const type = getValueType(target[key]) as (typeof noPropertyDataType)[number]
            return {
              ...descriptors,
              name: key,
              value: addValue({ target, key, objectId, type }),
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
