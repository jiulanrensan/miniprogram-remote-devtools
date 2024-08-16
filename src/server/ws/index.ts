import { WebSocketServer } from 'ws'
import http from 'http'
import type internal from 'stream'

const wsRoute = {
  devtools: 'devtools',
  client: 'client'
}
const serverMap = {
  [wsRoute.devtools]: null,
  [wsRoute.client]: null
}

export function initServer({ server }: { server: http.Server }) {
  server.on('upgrade', (request, socket, head) => {
    console.log('request', request.url)
    const { url } = request
    if (!url) {
      socket.destroy()
      return
    }
    // serverMap[url.includes(wsRoute.devtools) ? wsRoute.devtools : wsRoute.client] =
    //   initWebsocketServer({ request, socket, head })
  })
}

function handleUpgrade({
  request,
  socket,
  head
  // wss
}: {
  request: http.IncomingMessage
  socket: internal.Duplex
  head: Buffer
}) {
  // wss.handleUpgrade(request, socket, head, (ws) => {
  //   wss.emit('connection', ws, request)
  // })
}

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
