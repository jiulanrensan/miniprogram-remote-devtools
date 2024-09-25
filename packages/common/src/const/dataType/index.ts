export const dataType = {
  string: 'String',
  number: 'Number',
  boolean: 'Boolean',
  object: 'Object',
  array: 'Array',
  null: 'Null',
  undefined: 'Undefined',
  function: 'Function',
  symbol: 'Symbol',
  bigint: 'BigInt',
  date: 'Date',
  regexp: 'RegExp',
  error: 'Error',
  promise: 'Promise',
  set: 'Set',
  map: 'Map',
  weakset: 'WeakSet',
  weakmap: 'WeakMap',
  typedarray: 'TypedArray',
  arraybuffer: 'ArrayBuffer'
} as const

export const lowerDataType = Object.keys(dataType).reduce((acc, cur) => {
  acc[cur] = cur.toLocaleLowerCase()
  return acc
}, {}) as {
  [P in keyof typeof dataType]: Lowercase<(typeof dataType)[P]>
}

export const noPropertyDataType = [
  dataType.string,
  dataType.number,
  dataType.boolean,
  dataType.null,
  dataType.undefined,
  dataType.bigint,
  dataType.function
]
