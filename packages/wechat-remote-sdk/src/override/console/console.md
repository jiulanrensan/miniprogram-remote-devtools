# console 参数对应的 CDP

## String
`console.log('aaa')`

```json
{
  "type": "log",
  "args": [
    {
      "type": "string",
      "value": "aaa"
    }
  ],
  "executionContextId": 27,
  "timestamp": 1727167157870.619,
  "stackTrace": {
    "callFrames": [
      {
        "functionName": "",
        "scriptId": "765",
        "url": "",
        "lineNumber": 0,
        "columnNumber": 8
      }
    ]
  }
}
```

## Number
`console.log(123)`

```json
{
  "type": "log",
  "args": [
    {
      "type": "number",
      "value": 123,
      "description": "123"
    }
  ],
  "executionContextId": 27,
  "timestamp": 1727167201948.62,
  "stackTrace": {
    "callFrames": [
      {
        "functionName": "",
        "scriptId": "792",
        "url": "",
        "lineNumber": 0,
        "columnNumber": 8
      }
    ]
  }
}
```


## Boolean
`console.log(true)`
```json
{
  "type": "log",
  "args": [
    {
      "type": "boolean",
      "value": true
    }
  ],
  "executionContextId": 27,
  "timestamp": 1727168041840.073,
  "stackTrace": {
    "callFrames": [
      {
        "functionName": "",
        "scriptId": "814",
        "url": "",
        "lineNumber": 0,
        "columnNumber": 8
      }
    ]
  }
}
```
## undefined
`console.log(undefined)`
```json
{
  "type": "log",
  "args": [
    {
      "type": "undefined"
    }
  ],
  "executionContextId": 27,
  "timestamp": 1727168212293.72,
  "stackTrace": {
    "callFrames": [
      {
        "functionName": "",
        "scriptId": "871",
        "url": "",
        "lineNumber": 0,
        "columnNumber": 8
      }
    ]
  }
}
```


## BigInt
`console.log(BigInt(1))`
```json
{
  "type": "log",
  "args": [
    {
      "type": "bigint",
      "unserializableValue": "1n", // toString() + n
      "description": "1n"
    }
  ],
  "executionContextId": 27,
  "timestamp": 1727169607039.432,
  "stackTrace": {
    "callFrames": [
      {
        "functionName": "",
        "scriptId": "1285",
        "url": "",
        "lineNumber": 0,
        "columnNumber": 8
      }
    ]
  }
}
```


## Symbol
`onsole.log(Symbol())`
```json
{
  "type": "log",
  "args": [
    {
      "type": "symbol",
      "description": "Symbol()",
      "objectId": "-732749256386253889.27.11313"
    }
  ],
  "executionContextId": 27,
  "timestamp": 1727168878780.045,
  "stackTrace": {
    "callFrames": [
      {
        "functionName": "",
        "scriptId": "1021",
        "url": "",
        "lineNumber": 0,
        "columnNumber": 8
      }
    ]
  }
}
```

`onsole.log(Symbol(1))`
```json
{
  "type": "log",
  "args": [
    {
      "type": "symbol",
      "description": "Symbol(1)", // toString()
      "objectId": "-732749256386253889.27.11323"
    }
  ],
  "executionContextId": 27,
  "timestamp": 1727168890725.017,
  "stackTrace": {
    "callFrames": [
      {
        "functionName": "",
        "scriptId": "1032",
        "url": "",
        "lineNumber": 0,
        "columnNumber": 8
      }
    ]
  }
}
```

## Function
`console.log(function aa() {console.log(111111)})`

```json
{
  "type": "log",
  "args": [
    {
      "type": "function",
      "className": "Function",
      "description": "function aa() {console.log(111111)}", // toString()
      "objectId": "-732749256386253889.27.30068"
    }
  ],
  "executionContextId": 27,
  "timestamp": 1727171420860.716,
  "stackTrace": {
    "callFrames": [
      {
        "functionName": "",
        "scriptId": "1894",
        "url": "",
        "lineNumber": 0,
        "columnNumber": 8
      }
    ]
  }
}
```

## Async Function 
`console.log(async function aaa() {})`

```json
{
  "type": "log",
  "args": [
    {
      "type": "function",
      "className": "AsyncFunction",
      "description": "async function aaa() {}",
      "objectId": "-732749256386253889.27.34582"
    }
  ],
  "executionContextId": 27,
  "timestamp": 1727172161455.891,
  "stackTrace": {
    "callFrames": [
      {
        "functionName": "",
        "scriptId": "2057",
        "url": "",
        "lineNumber": 0,
        "columnNumber": 8
      }
    ]
  }
}
```

## Object
### Null
`console.log(null)`
```json
{
  "type": "log",
  "args": [
    {
      "type": "object",
      "subtype": "null",
      "value": null
    }
  ],
  "executionContextId": 27,
  "timestamp": 1727168118067.884,
  "stackTrace": {
    "callFrames": [
      {
        "functionName": "",
        "scriptId": "860",
        "url": "",
        "lineNumber": 0,
        "columnNumber": 8
      }
    ]
  }
}
```

### Object
`console.log({ a:1 })`
```json
{
  "type": "log",
  "args": [
    {
      "type": "object",
      "className": "Object",
      "description": "Object",
      "objectId": "-5766465894328255664.26.41906",
      "preview": {
        "type": "object",
        "description": "Object",
        "overflow": false,
        "properties": [
          {
            "name": "a",
            "type": "number",
            "value": "1"
          }
        ]
      }
    }
  ],
  "executionContextId": 26,
  "timestamp": 1727247813736.43,
  "stackTrace": {
    "callFrames": [
      {
        "functionName": "",
        "scriptId": "1570",
        "url": "",
        "lineNumber": 0,
        "columnNumber": 8
      }
    ]
  }
}
```

`Runtime.getProperties`
request
```json
{
  // id对应某一层级，这个层级下有key: a
  "objectId": "-5766465894328255664.26.41906",
  "ownProperties": true,
  "accessorPropertiesOnly": false,
  "nonIndexedPropertiesOnly": false,
  "generatePreview": true
}
```
response
```json
{
  "result": [
    {
      "name": "a",
      "value": {
        "type": "number",
        "value": 1,
        "description": "1"
      },
      "writable": true,
      "configurable": true,
      "enumerable": true,
      "isOwn": true
    }
  ],
  "internalProperties": [
    {
      "name": "[[Prototype]]",
      "value": {
        "type": "object",
        "className": "Object",
        "description": "Object",
        "objectId": "-5766465894328255664.26.41909"
      }
    }
  ]
}
```

`console.log({a: { b: 1 } })`
```json
{
  "type": "log",
  "args": [
    {
      "type": "object",
      "className": "Object",
      "description": "Object",
      "objectId": "-5766465894328255664.26.41926",
      "preview": {
        "type": "object",
        "description": "Object",
        "overflow": false,
        "properties": [
          {
            "name": "a",
            "type": "object",
            "value": "Object"
          }
        ]
      }
    }
  ],
  "executionContextId": 26,
  "timestamp": 1727249144819.304,
  "stackTrace": {
    "callFrames": [
      {
        "functionName": "",
        "scriptId": "1582",
        "url": "",
        "lineNumber": 0,
        "columnNumber": 8
      }
    ]
  }
}
```

`Runtime.getProperties`
request
```json
{
  // id对应某一层级，这个层级下有key: a
  "objectId": "-5766465894328255664.26.41926",
  "ownProperties": true,
  "accessorPropertiesOnly": false,
  "nonIndexedPropertiesOnly": false,
  "generatePreview": true
}
```
response
```json
{
  "result": [
    {
      "name": "a",
      "value": {
        "type": "object",
        "className": "Object",
        "description": "Object",
        "objectId": "-5766465894328255664.26.41929",
        "preview": {
          "type": "object",
          "description": "Object",
          "overflow": false,
          "properties": [
            {
              "name": "b",
              "type": "number",
              "value": "1"
            }
          ]
        }
      },
      "writable": true,
      "configurable": true,
      "enumerable": true,
      "isOwn": true
    }
  ],
  "internalProperties": [
    {
      "name": "[[Prototype]]",
      "value": {
        "type": "object",
        "className": "Object",
        "description": "Object",
        "objectId": "-5766465894328255664.26.41930"
      }
    }
  ]
}
```

`console.log({a: {b: 1}, c: {d: 2}})`
```json
{
  "type": "log",
  "args": [
    {
      "type": "object",
      "className": "Object",
      "description": "Object",
      "objectId": "-5766465894328255664.26.41973",
      "preview": {
        "type": "object",
        "description": "Object",
        "overflow": false,
        "properties": [
          {
            "name": "a",
            "type": "object",
            "value": "Object"
          },
          {
            "name": "c",
            "type": "object",
            "value": "Object"
          }
        ]
      }
    }
  ],
  "executionContextId": 26,
  "timestamp": 1727320318412.088,
  "stackTrace": {
    "callFrames": [
      {
        "functionName": "",
        "scriptId": "2154",
        "url": "",
        "lineNumber": 0,
        "columnNumber": 8
      }
    ]
  }
}
```

`Runtime.getProperties`
request
```json
{
  // id对应某一层级，这个层级下有key: a,c
  "objectId": "-5766465894328255664.26.41973",
  "ownProperties": true,
  "accessorPropertiesOnly": false,
  "nonIndexedPropertiesOnly": false,
  "generatePreview": true
}
```
response
```json
{
  "result": [
    {
      "name": "a",
      "value": {
        "type": "object",
        "className": "Object",
        "description": "Object",
        "objectId": "-5766465894328255664.26.41976",
        "preview": {
          "type": "object",
          "description": "Object",
          "overflow": false,
          "properties": [
            {
              "name": "b",
              "type": "number",
              "value": "1"
            }
          ]
        }
      },
      "writable": true,
      "configurable": true,
      "enumerable": true,
      "isOwn": true
    },
    {
      "name": "c",
      "value": {
        "type": "object",
        "className": "Object",
        "description": "Object",
        "objectId": "-5766465894328255664.26.41977",
        "preview": {
          "type": "object",
          "description": "Object",
          "overflow": false,
          "properties": [
            {
              "name": "d",
              "type": "number",
              "value": "2"
            }
          ]
        }
      },
      "writable": true,
      "configurable": true,
      "enumerable": true,
      "isOwn": true
    }
  ],
  "internalProperties": [
    {
      "name": "[[Prototype]]",
      "value": {
        "type": "object",
        "className": "Object",
        "description": "Object",
        "objectId": "-5766465894328255664.26.41978"
      }
    }
  ]
}
```


### Array
`console.log([1,2,3])`

```json
{
  "type": "log",
  "args": [
    {
      "type": "object",
      "subtype": "array",
      "className": "Array",
      "description": "Array(3)",
      "objectId": "-5766465894328255664.26.10102",
      "preview": {
        "type": "object",
        "subtype": "array",
        "description": "Array(3)",
        "overflow": false,
        "properties": [
          {
            "name": "0",
            "type": "number",
            "value": "1"
          },
          {
            "name": "1",
            "type": "number",
            "value": "2"
          },
          {
            "name": "2",
            "type": "number",
            "value": "3"
          }
        ]
      }
    }
  ],
  "executionContextId": 26,
  "timestamp": 1727245424734.536,
  "stackTrace": {
    "callFrames": [
      {
        "functionName": "",
        "scriptId": "753",
        "url": "",
        "lineNumber": 0,
        "columnNumber": 8
      }
    ]
  }
}
```
### Date
`console.log(new Date())`
```json
{
  "type": "log",
  "args": [
    {
      "type": "object",
      "subtype": "date",
      "className": "Date",
      "description": "Wed Sep 25 2024 14:40:56 GMT+0800 (中国标准时间)",
      "objectId": "-5766465894328255664.26.13432",
      "preview": {
        "type": "object",
        "subtype": "date",
        "description": "Wed Sep 25 2024 14:40:56 GMT+0800 (中国标准时间)",
        "overflow": false,
        "properties": []
      }
    }
  ],
  "executionContextId": 26,
  "timestamp": 1727246467231.915,
  "stackTrace": {
    "callFrames": [
      {
        "functionName": "",
        "scriptId": "943",
        "url": "",
        "lineNumber": 0,
        "columnNumber": 8
      }
    ]
  }
}
```

### Map
```js
const map = new Map()
map.set(1, 1)
map.set(2,2)
console.log(map)
```
```json
{
  "type": "log",
  "args": [
    {
      "type": "object",
      "subtype": "map",
      "className": "Map",
      "description": "Map(2)",
      "objectId": "-5766465894328255664.26.25516",
      "preview": {
        "type": "object",
        "subtype": "map",
        "description": "Map(2)",
        "overflow": false,
        "properties": [
          {
            "name": "size",
            "type": "number",
            "value": "2"
          }
        ],
        "entries": [
          {
            "key": {
              "type": "number",
              "description": "1",
              "overflow": false,
              "properties": []
            },
            "value": {
              "type": "number",
              "description": "1",
              "overflow": false,
              "properties": []
            }
          },
          {
            "key": {
              "type": "number",
              "description": "2",
              "overflow": false,
              "properties": []
            },
            "value": {
              "type": "number",
              "description": "2",
              "overflow": false,
              "properties": []
            }
          }
        ]
      }
    }
  ],
  "executionContextId": 26,
  "timestamp": 1727247218812.731,
  "stackTrace": {
    "callFrames": [
      {
        "functionName": "",
        "scriptId": "1477",
        "url": "",
        "lineNumber": 0,
        "columnNumber": 8
      }
    ]
  }
}
```


