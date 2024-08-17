import { WebSocketServer } from 'ws'
import http from 'http'
import type internal from 'stream'
/**
 * client <----ws1----> server <----ws2----> devtools
 * 从流程上来说，是client发起连接且发送信息，再由server中转发送到devtools
 * 所以只有在ws1建立连接后，才能建立ws2连接，如果server接收到ws1发送的信息时，还没建立ws2，就先缓存，等待建立后再发送
 */

type WsServer = ReturnType<typeof initWebsocketServer>

const wsRoute = {
  devtools: '/devtools',
  client: '/client'
}
const serverMap: { [key: string]: WsServer | null } = {
  [wsRoute.devtools]: null,
  [wsRoute.client]: null
}

/**
 * 每个id对应的 client 和 devtools 的 websocket 实例
 */
const mapping = new Map() as Map<
  string,
  {
    client: WebSocket
    devtools: WebSocket
  }
>

/**
 * 待向devtools发送的数据
 */
const tempData = new Map() as Map<string, Array<any>>

export function initServer({ server }: { server: http.Server }) {
  Object.assign(serverMap, {
    [wsRoute.client]: initClientServer(),
    [wsRoute.devtools]: initDevtoolsServer()
  })
  server.on('upgrade', (request, socket, head) => {
    console.log('request', request.url) // /client
    const { url } = request
    if (!url) {
      socket.destroy()
      return
    }
    const wss = serverMap[url]
    if (!wss) return
    handleUpgrade({ request, socket, head, wss })
  })
}

function handleUpgrade({
  request,
  socket,
  head,
  wss
}: {
  request: http.IncomingMessage
  socket: internal.Duplex
  head: Buffer
  wss: WsServer
}) {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request)
  })
}

function initClientServer() {
  // const wss = initWebsocketServer()
  // return wss
  const wss = new WebSocketServer({ noServer: true })
  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      console.log('received: %s', message)
    })
    ws.on('error', console.error)
    ws.on('close', () => {
      console.log('disconnected')
    })
  })
  return wss
}

function initDevtoolsServer() {
  const wss = initWebsocketServer()
  return wss
}

// {
//   onMessage,
//   onError,
//   onClose
// }: {
//   onMessage: (message: string) => void
//   onError?: (error: Error) => void
//   onClose?: () => void
// }

function initWebsocketServer() {
  const wss = new WebSocketServer({ noServer: true })
  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      console.log('received: %s', message)
    })
    ws.on('error', console.error)
    ws.on('close', () => {
      console.log('disconnected')
    })
  })
  return wss
}
