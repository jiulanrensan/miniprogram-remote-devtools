export enum Domain {
  Runtime = 'Runtime',
  Network = 'Network',
  Page = 'Page'
}

export const Network = {
  method: {
    enable: `${Domain.Network}.enable`,
    getResponseBody: `${Domain.Network}.getResponseBody`
  },
  events: {
    requestWillBeSent: `${Domain.Network}.requestWillBeSent`,
    responseReceived: `${Domain.Network}.responseReceived`,
    dataReceived: `${Domain.Network}.dataReceived`,
    loadingFinished: `${Domain.Network}.loadingFinished`
  }
} as const

export const Page = {
  method: {
    enable: `${Domain.Page}.enable}`,
    getResourceTree: `${Domain.Page}.getResourceTree`
  }
} as const

export const Runtime = {
  method: {
    enable: `${Domain.Runtime}.enable`
  },
  events: {
    consoleAPICalled: `${Domain.Runtime}.consoleAPICalled`
  }
} as const
