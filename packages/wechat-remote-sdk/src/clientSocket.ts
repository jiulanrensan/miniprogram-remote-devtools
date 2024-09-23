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
  }
  send(data: string) {
    this.socket.send({
      data
    })
  }
  close(option: WechatMiniprogram.SocketTaskCloseOption) {
    this.socket.close(option)
  }
  onMessage(callback: WechatMiniprogram.SocketTaskOnMessageCallback) {
    this.socket.onMessage(callback)
  }
}
