import { WebSocketServer } from 'ws'
import http from 'http'
import type internal from 'stream'

const wsRoute = {
  devtools: 'devtools',
  client: 'client'
}
const serverMap: { [key: string]: WebSocketServer | null } = {
  [wsRoute.devtools]: null,
  [wsRoute.client]: null
}

export function initServer({ server }: { server: http.Server }) {
  Object.assign(serverMap, {
    [wsRoute.client]: initClientServer(),
    [wsRoute.devtools]: initDevtoolsServer()
  })
  server.on('upgrade', (request, socket, head) => {
    console.log('request', request.url)
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
  wss: WebSocketServer
}) {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request)
  })
}

function initClientServer() {
  const wss = initWebsocketServer({
    onMessage: (message) => {
      console.log('received: %s', message)
    }
  })
  return wss
}

function initDevtoolsServer() {
  const wss = initWebsocketServer({
    onMessage: (message) => {
      console.log('received: %s', message)
    }
  })
  return wss
}

function initWebsocketServer({
  onMessage,
  onError,
  onClose
}: {
  onMessage: (message: string) => void
  onError?: (error: Error) => void
  onClose?: () => void
}) {
  const wss = new WebSocketServer({ noServer: true })
  wss.on('connection', (ws) => {
    ws.on('message', onMessage)
    ws.on('error', onError || console.error)
    ws.on(
      'close',
      onClose ||
        (() => {
          console.log('disconnected')
        })
    )
  })
  return wss
}
