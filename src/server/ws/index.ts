import { WebSocketServer } from 'ws'

export function initWebsocketServer() {
  const wss = new WebSocketServer({ port: 8080 })
  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      console.log('received: %s', message)
    })
  })
}
