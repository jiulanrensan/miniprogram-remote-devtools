module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1726826808577, function(require, module, exports) {
var Domain;
(function (Domain) {
    Domain["Runtime"] = "Runtime";
    Domain["Network"] = "Network";
    Domain["Page"] = "Page";
})(Domain || (Domain = {}));
const Network = {
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
};
const Page = {
    method: {
        getResourceTree: `${Domain.Page}.getResourceTree`
    }
};
const Runtime = {
    method: {
        enable: `${Domain.Runtime}.enable`
    },
    events: {
        consoleAPICalled: `${Domain.Runtime}.consoleAPICalled`
    }
};

function overrideApi({ target, apiKey, overrideFunc, order = 'after' }) {
    const originHook = target[apiKey];
    target[apiKey] = function (...args) {
        if (order === 'before')
            overrideFunc(...args);
        // 不一定有这个钩子，所以要判断一下
        if (originHook)
            originHook.apply(target, args);
        if (order === 'after')
            overrideFunc(...args);
    };
}

function queryObject(url) {
    const [, query] = url.split('?');
    if (!query)
        return {};
    const queryObject = {};
    query.split('&').forEach((item) => {
        const [key, value] = item.split('=');
        queryObject[key] = value;
    });
    return queryObject;
}
function urlPath(url) {
    const [path] = url.split('?');
    return path;
}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });Object.defineProperty(exports, 'Domain', { enumerable: true, configurable: true, get: function() { return Domain; } });Object.defineProperty(exports, 'Network', { enumerable: true, configurable: true, get: function() { return Network; } });Object.defineProperty(exports, 'Page', { enumerable: true, configurable: true, get: function() { return Page; } });Object.defineProperty(exports, 'Runtime', { enumerable: true, configurable: true, get: function() { return Runtime; } });Object.defineProperty(exports, 'overrideApi', { enumerable: true, configurable: true, get: function() { return overrideApi; } });Object.defineProperty(exports, 'queryObject', { enumerable: true, configurable: true, get: function() { return queryObject; } });Object.defineProperty(exports, 'urlPath', { enumerable: true, configurable: true, get: function() { return urlPath; } });
//# sourceMappingURL=index.js.map

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1726826808577);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map