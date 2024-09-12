import { ClientSocket } from '../clientSocket'

export type BaseOptions = {
  socket: ClientSocket
}
export class Base {
  public socket: ClientSocket
  constructor(options: BaseOptions) {
    const { socket } = options
    this.socket = socket
    this.enable()
    this.init()
  }
  public init() {}
  public enable() {}
  public send(data: any) {
    this.socket.send(JSON.stringify(data))
  }
}
