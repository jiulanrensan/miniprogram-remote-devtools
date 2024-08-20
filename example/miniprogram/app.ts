// app.ts
const {log} = console
App<IAppOption>({
  globalData: {},
  onLaunch() {
    connect()
  },
  
})

function connect() {
  const socketTask = wx.connectSocket({
    url: 'ws://localhost:3000/client?id=111',
    timeout: 15000,
    success: (res) => {
      log('success', res)
    },
    fail: (err) => {
      log('fail', err)
    }
  })
  socketTask.onMessage((res) => {
    // const data = JSON.parse(res)
    log('onMessage', res);
  })
  console.log = (...args: any[]) => {
    log.apply(console, args)
    socketTask.send({
      data: JSON.stringify({
        method: 'Runtime.consoleAPICalled',
        params: {
          type: 'log',
          args: [
            {
              type: 'number',
              value: 111,
              description: '111'
            }
          ],
          executionContextId: 1,
          timestamp: new Date().getTime()
        }
      })
    })
  }
  setTimeout(() => {
    console.log(111)
    // socketTask.send({
    //   data: '111'
    // })
    // socketTask.close({
    //   code: 1000
    // })
  }, 15000)
}