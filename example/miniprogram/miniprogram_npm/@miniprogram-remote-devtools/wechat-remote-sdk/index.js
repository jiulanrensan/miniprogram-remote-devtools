module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1726826808578, function(require, module, exports) {
var __TEMP__ = require('@miniprogram-remote-devtools/common');var overrideApi = __TEMP__['overrideApi'];var Runtime$1 = __TEMP__['Runtime'];

const defaultOptions = {
    url: '',
    timeout: 15000
};
class ClientSocket {
    constructor(options) {
        this.connectSocket = wx.connectSocket;
        this.socket = this.connectSocket(Object.assign(Object.assign({}, defaultOptions), options));
        this.socket.onClose(() => {
            wx.showModal({
                title: '提示',
                content: '调试已断开'
            });
        });
        this.socket.onError((errMsg) => {
            console.log('socket errMsg', errMsg);
        });
        this.socket.onOpen((res) => {
            console.log('socket onOpen');
        });
    }
    send(data) {
        this.socket.send({
            data
        });
    }
    close(option) {
        this.socket.close(option);
    }
    onMessage(callback) {
        this.socket.onMessage(callback);
    }
}

/**
 * wechat-miniprogram type 只有这几种api
 */
const { log, info, warn, error, debug, group, groupEnd } = console;
const consoleAPICalledTypeMap = new Map([
    [log, 'log'],
    [debug, 'debug'],
    [info, 'info'],
    [error, 'error'],
    [warn, 'warning'],
    [group, 'startGroup'],
    [groupEnd, 'endGroup']
]);

function overrideConsole(send) {
    [log, info, warn, error, debug].forEach((fn) => {
        function overrideFunc(...args) {
            send({
                method: Runtime$1.events.consoleAPICalled,
                params: {
                    type: consoleAPICalledTypeMap.get(fn),
                    args: handleArgs(args),
                    executionContextId: 1,
                    stackTrace: {
                        callFrames: []
                    },
                    timestamp: new Date().getTime()
                }
            });
        }
        overrideApi({
            target: console,
            apiKey: fn.name,
            overrideFunc
        });
    });
}
function handleArgs(args) {
    return args.map((arg) => {
        return {
            type: typeof arg,
            value: arg
        };
    });
}

class Base {
    constructor(options) {
        const { socket } = options;
        this.socket = socket;
        this.enable();
        this.init();
    }
    init() { }
    enable() { }
    send(data) {
        this.socket.send(JSON.stringify(data));
    }
}

/**
 * Runtime
 * consoleAPICalled
 * exceptionThrown
 */
class Runtime extends Base {
    init() {
        // 绑定this
        overrideConsole(this.send.bind(this));
    }
}

class MiniprogramRemoteDevtoolSDK {
    init(options) {
        const socket = new ClientSocket(options);
        [Runtime].forEach((domain) => {
            new domain({
                socket
            });
        });
    }
}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });Object.defineProperty(exports, 'default', { enumerable: true, configurable: true, get: function() { return MiniprogramRemoteDevtoolSDK; } });
//# sourceMappingURL=index.js.map

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1726826808578);
})()
//miniprogram-npm-outsideDeps=["@miniprogram-remote-devtools/common"]
//# sourceMappingURL=index.js.map