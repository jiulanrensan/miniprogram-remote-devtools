import { AnyFunction, Domain } from '@miniprogram-remote-devtools/common'
import { CDPCallback, ClientSocket } from '../clientSocket'
import { originLog } from './Runtime'

export type BaseOptions = {
  socket: ClientSocket
  domain: Domain
}

export class Base {
  private socket: ClientSocket
  private domain: Domain
  constructor(options: BaseOptions) {
    const { socket, domain } = options
    this.socket = socket
    this.domain = domain
    socket.initSubscribe(domain)
    this.init()
  }
  init() {}
  subscribe(record: Record<string, CDPCallback>) {
    this.socket.subscribe(this.domain, record)
  }
  send(data: any) {
    this.socket.send(JSON.stringify(data))
  }
}
