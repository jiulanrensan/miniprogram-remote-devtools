import MiniprogramRemoteDevtoolSDK from "@miniprogram-remote-devtools/wechat-remote-sdk"
// import MiniprogramRemoteDevtoolSDK from "./sdk/index.js"

// app.ts
const {log} = console
// "Page.getResourceTree"
App<IAppOption>({
  globalData: {},
  onLaunch() {
    const sdk = new MiniprogramRemoteDevtoolSDK()
    sdk.init({
      url: 'ws://localhost:3000/client?id=111',
      timeout: 15000,
    })
    setTimeout(() => {
      console.log('hello world')
      console.log(123)
      console.log(true)
      console.log(Symbol(12))
      console.log(void 0)
      console.log(function aa(){return 1});
      console.log(async function aa(){return 2});
      console.log(null)
      console.log({a: 1})
      console.log({ a:{b:1} })
      
    }, 1000);
    // connect()
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
  const contextId = 0
  socketTask.onMessage((res) => {
    // const data = JSON.parse(res)
    log('onMessage', res);
    // const { data } = res
    // const { id, method } = JSON.parse(data as string)
    // socketTask.send({ 
    //   data: JSON.stringify({
    //     id
    //   })
    // })
  })
  setTimeout(() => {
    console.log(111)
    console.log(222)
    console.log(333)
  }, 10000);
  console.log = (...args: any[]) => {
    log.apply(console, args)
    socketTask.send({
      data: JSON.stringify({
        method: 'Runtime.consoleAPICalled',
        params: {
          type: 'log',
          args: args.map(item => ({
            type: 'number',
            value: item,
            description: String(item)
          })),
          executionContextId: contextId,
          timestamp: new Date().getTime(),
          stackTrace: {
            callFrames: []
          }
        }
      })
    })
  }
}