export enum Domain {
  Runtime = 'Runtime',
  Network = 'Network'
}

export const Methods = {
  [Domain.Runtime]: {
    enable: 'enable'
  }
}

export const Events = {
  [Domain.Runtime]: {
    consoleAPICalled: 'consoleAPICalled'
  }
}
