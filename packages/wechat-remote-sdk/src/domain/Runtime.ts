import { Domain, getValueType, Runtime as RuntimeDomain } from '@miniprogram-remote-devtools/common'
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
        if (!ownProperties) return
        const target = getObjectById(objectId)
        const result = Object.keys(target).map((key) => {
          const descriptors = Object.getOwnPropertyDescriptor(target, key)
          return {
            ...descriptors,
            name: key,
            value: {
              type: getValueType(target[key]).toLocaleLowerCase(),
              value: target[key],
              description: String(target[key])
            },
            isOwn: true
          }
        })
        const res = {
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
          ],
          result
        }
        //
        super.send({
          id,
          result: {
            result: [
              {
                name: 'a',
                value: {
                  type: 'number',
                  value: 1,
                  description: '1'
                },
                writable: true,
                configurable: true,
                enumerable: true,
                isOwn: true
              }
            ],
            internalProperties: [
              {
                name: '[[Prototype]]',
                value: {
                  type: 'object',
                  className: 'Object',
                  description: 'Object',
                  objectId: '-5766465894328255664.26.41909'
                }
              }
            ]
          }
        })
      }
    })
  }
}
