import { Domain } from '../domain'

export const Network = {
  requestWillBeSent: `${Domain.Network}.requestWillBeSent`,
  responseReceived: `${Domain.Network}.responseReceived`,
  dataReceived: `${Domain.Network}.dataReceived`,
  loadingFinished: `${Domain.Network}.loadingFinished`
} as const
