import { ClientSocket, ClientSocketOptions } from './clientSocket'
import { Runtime } from './domain/Runtime'

export default function miniprogramRemoteDevtoolsSDK() {
  console.log('miniprogramRemoteDevtoolsSDK')
}

export class MiniprogramRemoteDevtoolSDK {
  init(options: ClientSocketOptions) {
    const socket = new ClientSocket(options)
    ;[Runtime].forEach((domain) => {
      new domain({
        socket
      })
    })
  }
}
