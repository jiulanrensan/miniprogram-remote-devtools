import { ClientSocket, ClientSocketOptions } from './clientSocket'

export default function miniprogramRemoteDevtoolsSDK() {
  console.log('miniprogramRemoteDevtoolsSDK')
}

export class MiniprogramRemoteDevtoolSDK {
  init(options: ClientSocketOptions) {
    const socket = new ClientSocket(options)
  }
}
