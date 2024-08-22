import { WebSocketServer, WebSocket, RawData } from 'ws'
// import type { WebSocket } from 'ws'
import http from 'http'
import type internal from 'stream'
import { queryObject, urlPath } from '@/common/url'
import { Runtime } from '@/common/const/domain/methods/Runtime'
import { Network } from '@/common/const/domain/methods/Network'
import { Page } from '@/common/const/domain/methods/Page'
/**
 * client <----ws1----> server <----ws2----> devtools
 * 从流程上来说，是client发起连接且发送信息，再由server中转发送到devtools
 * 所以只有在ws1建立连接后，才能建立ws2连接，如果server接收到ws1发送的信息时，还没建立ws2，就先缓存，等待建立后再发送
 */

type WsServer = ReturnType<typeof initDevtoolsServer>

const wsRoute = {
  devtools: '/devtools',
  client: '/client'
}
const serverMap: { [key: string]: WsServer | null } = {
  [wsRoute.devtools]: null,
  [wsRoute.client]: null
}

type socketInsMap = Map<string, WebSocket>
class SocketMapping {
  /**
   * 每个id对应的  websocket 实例
   */
  instanceMapping: socketInsMap = new Map()
  init(id: string, ins: WebSocket) {
    this.instanceMapping.set(id, ins)
  }
  get(id: string) {
    return this.instanceMapping.get(id)
  }
  set(id: string, ins: WebSocket) {
    this.instanceMapping.set(id, ins)
  }
  has(id: string) {
    return this.instanceMapping.has(id)
  }
  delete(id: string) {
    if (!this.has(id)) return
    const map = this.get(id)
    map?.terminate()
    this.instanceMapping.delete(id)
  }
}

class ClientSocketMapping extends SocketMapping {}

class DevtoolsSocketMapping extends SocketMapping {}

const devtoolsSocketMapping = new DevtoolsSocketMapping()
const clientSocketMapping = new ClientSocketMapping()

/**
 * 待向devtools发送的数据
 */
class DataToDevtools {
  enable = false
  tempListMap: Map<string, Array<any>> = new Map()
  changeEnable(bool: boolean) {
    this.enable = bool
  }
  init(id: string) {
    if (this.has(id)) return
    this.tempListMap.set(id, [])
  }
  get(id: string) {
    return this.tempListMap.get(id)
  }
  has(id: string) {
    return this.tempListMap.has(id)
  }
  add(id: string, data: any) {
    this.init(id)
    const list = this.tempListMap.get(id)
    this.tempListMap.set(id, [...(list || []), data])
  }
  delete(id: string) {
    this.tempListMap.delete(id)
  }
  send(id: string, ws: WebSocket, data?: any) {
    if (!this.enable) return
    const list = this.get(id)
    if (!list) {
      if (data) send(ws, data)
      return
    }
    const dataList = data ? [...list, data] : list
    dataList.forEach((item) => {
      send(ws, item)
    })
    this.delete(id)
  }
}
const tempDataToDevtools = new DataToDevtools()

export function initServer({ server }: { server: http.Server }) {
  Object.assign(serverMap, {
    [wsRoute.client]: initClientServer(),
    [wsRoute.devtools]: initDevtoolsServer()
  })
  server.on('upgrade', (request, socket, head) => {
    // console.log('request', request.url) // /client?id=111
    const { url } = request
    if (!checkSocketValid(request)) {
      console.log('invalid socket query: ', url)
      socket.destroy()
      return
    }
    const path = urlPath(url!)
    const wss = serverMap[path]
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
  const wss = new WebSocketServer({ noServer: true })
  wss.on('connection', (ws, request) => {
    const { url } = request
    console.log('client connected', url)
    const { id } = queryObject(url!)
    clientSocketMapping.init(id, ws)
    ws.on('message', (data) => {
      // const path = urlPath(url!)
      const devtools = devtoolsSocketMapping.get(id)
      if (!devtools || !tempDataToDevtools.enable) {
        // devtools未连接 或 不是可发送状态，暂存消息
        tempDataToDevtools.add(id, data)
      } else {
        // tempData已经没了，直接发送
        if (!tempDataToDevtools.has(id)) {
          send(devtools, data)
          return
        }
        // tempData和当前消息一起发送
        tempDataToDevtools.send(id, devtools, data)
      }
      // console.log('client message', data.toString())
    })
    ws.on('error', console.error)
    ws.on('close', () => {
      clientSocketMapping.delete(id)
      devtoolsSocketMapping.delete(id)
      tempDataToDevtools.delete(id)
      console.log('client disconnected')
    })
  })
  return wss
}

function initDevtoolsServer() {
  const wss = new WebSocketServer({ noServer: true })
  wss.on('connection', (ws, request) => {
    const { url } = request
    console.log('devtools connected', url)
    const { id } = queryObject(url!)
    if (!clientSocketMapping.has(id)) {
      // 如果没有id，说明与client端没有连接，则中断与devtools的连接
      ws.terminate()
      console.log('terminate: no client socket')
      return
    }
    devtoolsSocketMapping.init(id, ws)
    tempDataToDevtools.send(id, ws)
    ws.on('message', (data) => {
      const client = clientSocketMapping.get(id)
      if (!client) {
        // 如果没有说明已经中断
        ws.terminate()
        console.log('terminate: no socketMapping instance')
        return
      }
      const { bool, id: uid } = isPageGetResourceTree(data)
      if (bool) {
        ws.send(JSON.stringify({ id: uid }))
        tempDataToDevtools.changeEnable(true)
        // 初始化之后将缓存的数据发送给devtools
        tempDataToDevtools.send(id, ws)
        return
      }
      send(client, data)
      // console.log('devtools message', data.toString())
    })
    ws.on('error', console.error)
    ws.on('close', () => {
      devtoolsSocketMapping.delete(id)
      clientSocketMapping.delete(id)
      tempDataToDevtools.delete(id)
      console.log('devtools disconnected')
    })
  })
  return wss
}

function checkSocketValid(request: http.IncomingMessage) {
  const { url } = request
  if (!url) return false
  const queryObj = queryObject(url)
  if (!('id' in queryObj)) {
    console.log(url, 'query没有id')
    return false
  }
  const path = urlPath(url)
  const mapping = {
    [wsRoute.client]: clientSocketMapping,
    [wsRoute.devtools]: devtoolsSocketMapping
  }[path]
  if (!mapping) {
    console.log(`无效path: ${path}`)
    return false
  }
  // 如果id已经连接过
  if (mapping.get(queryObj.id)) {
    console.log(url, 'id已经连接过')
    return false
  }
  return true
}

/**
 * devtools连接上服务器后，每个 Domain 都会发出消息，调试时发现需要给 Page.getResourceTree 方法回应，devtools 才能展示 console
 */
function isPageGetResourceTree(data: RawData) {
  const { id: uid, method } = JSON.parse(data.toString())
  console.log('method', method)
  return {
    bool: method.includes(Page.getResourceTree),
    id: uid
  }
}

function send(ws: WebSocket, data: any) {
  ws.send(data, { binary: false })
}
