import { CDPArgs, Domain } from '@miniprogram-remote-devtools/common'

/**
 * 1.7.0 及以上版本，最多可以同时存在 5 个 WebSocket 连接
 */
export type ClientSocketOptions = {
  url: string
  timeout?: number
}
export type CDPCallback = (data: CDPArgs) => void
const defaultOptions = {
  url: '',
  timeout: 15000
}
export class ClientSocket {
  connectSocket = wx.connectSocket
  socket: WechatMiniprogram.SocketTask
  private subscribeMap: Map<string, Record<string, CDPCallback>> = new Map()
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
      this.public(info)
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
    this.subscribeMap.set(domain, {})
  }
  subscribe(domain: Domain, record: Record<string, CDPCallback>) {
    this.subscribeMap.set(domain, record)
  }
  public(data: CDPArgs) {
    const { method: _method, params, id } = data
    const [domain] = _method.split('.')
    const funcRecord = this.subscribeMap.get(domain)
    if (!funcRecord || !funcRecord[_method]) return
    funcRecord[_method](data)
  }
  clear() {
    this.subscribeMap.clear()
  }
}
