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

## Null
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
      "unserializableValue": "1n", // valueOf()
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
      "description": "Symbol(1)", // valueOf()
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
      "description": "function aa() {console.log(111111)}", // valueOf()
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

