export type BaseOptions = {
  socket: WechatMiniprogram.SocketTask
}
export class Base {
  public socket: WechatMiniprogram.SocketTask
  constructor(options: BaseOptions) {
    const { socket } = options
    this.socket = socket
    this.enable()
    this.init()
  }
  public init() {}
  public enable() {}
  public send(data: any) {
    this.socket.send({
      data: JSON.stringify(data)
    })
  }
}
