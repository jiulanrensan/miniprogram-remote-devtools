import { ClientSocket, ClientSocketOptions } from './clientSocket'
import { Runtime } from './domain/Runtime'

export default class MiniprogramRemoteDevtoolSDK {
  init(options: ClientSocketOptions) {
    const socket = new ClientSocket(options)
    ;[Runtime].forEach((domain) => {
      new domain({
        socket
      })
    })
  }
}
