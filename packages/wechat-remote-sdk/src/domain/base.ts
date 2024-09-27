import { AnyFunction, Domain } from '@miniprogram-remote-devtools/common'
import { ClientSocket } from '../clientSocket'
import { originLog } from './Runtime'

export type BaseOptions = {
  socket: ClientSocket
}
export class Base {
  private socket: ClientSocket
  constructor(options: BaseOptions) {
    const { socket } = options
    this.socket = socket
    this.init()
    this.socket.onMessage((res) => {
      const info = JSON.parse(res.data as string)
      if (info && info.method) {
        this.enable(info)
      }
    })
  }
  public init() {}
  public enable(info: { id: number; method: string }) {
    const { id, method } = info
    const doamins = Object.keys(Domain)
    if (doamins.some((domain) => `${domain}.enable` === method)) {
      this.send({ id })
    }
  }
  public send(data: any) {
    this.socket.send(JSON.stringify(data))
  }
}
