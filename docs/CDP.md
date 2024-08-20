## Chrome Devtools Protocol

参考[Chrome Devtools Protocol文档](https://chromedevtools.github.io/devtools-protocol/)
以下为项目实现的协议

### [Network](https://chromedevtools.github.io/devtools-protocol/tot/Network/)

#### Methods
getResponseBody


#### Events 
requestWillBeSent
responseReceived
dataReceived
loadingFinished

webSocketCreated
webSocketWillSendHandshakeRequest
webSocketHandshakeResponseReceived
webSocketFrameSent
webSocketFrameReceived
webSocketFrameError
webSocketClosed

### [Runtime]()

#### Methods
getExceptionDetails ?
getProperties ?

#### Events 
consoleAPICalled
exceptionThrown