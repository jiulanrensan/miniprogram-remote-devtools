import { CDPArgs, Domain } from '@miniprogram-remote-devtools/common'

/**
 * 1.7.0 及以上版本，最多可以同时存在 5 个 WebSocket 连接
 */
export type ClientSocketOptions = {
  url: string
  timeout?: number
}
const defaultOptions = {
  url: '',
  timeout: 15000
}
export class ClientSocket {
  connectSocket = wx.connectSocket
  socket: WechatMiniprogram.SocketTask
  private subscribeMap: Map<string, AnyFunction[]> = new Map()
  constructor(options: ClientSocketOptions) {
    this.socket = this.connectSocket({
      ...defaultOptions,
      ...options
    })
    this.socket.onClose(() => {
      wx.showModal({
        title: '提示',
        content: '调试已断开'
      })
      this.clear()
    })
    this.socket.onError((errMsg) => {
      console.log('socket errMsg', errMsg)
    })
    this.socket.onOpen(() => {
      console.log('socket onOpen')
      wx.showToast({
        title: '调试已连接'
      })
    })
    this.socket.onMessage((resp: WechatMiniprogram.SocketTaskOnMessageCallbackResult) => {
      const { data } = resp
      const info = JSON.parse(data as string) as CDPArgs
      this.public(info.method, info)
    })
  }
  send(data: string) {
    this.socket.send({
      data
    })
  }
  close(option: WechatMiniprogram.SocketTaskCloseOption) {
    this.socket.close(option)
    this.clear()
  }
  onMessage(callback: WechatMiniprogram.SocketTaskOnMessageCallback) {
    this.socket.onMessage(callback)
  }
  initSubscribe(domain: Domain) {
    this.subscribeMap.set(domain, [])
  }
  subscribe(domain: Domain, callback: AnyFunction) {
    let list = this.subscribeMap.get(domain)
    if (!list) {
      list = []
      this.subscribeMap.set(domain, list)
    }
    list.push(callback)
  }
  public(domain: Domain, data: any) {
    const list = this.subscribeMap.get(domain)
    if (!list) return
    list.forEach((callback) => {
      callback(data)
    })
  }
  clear() {
    this.subscribeMap.clear()
  }
}
