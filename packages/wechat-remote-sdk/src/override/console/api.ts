/**
 * wechat-miniprogram type 只有这几种api
 */
const { log, info, warn, error, debug, group, groupEnd } = console
export { log, info, warn, error, debug, group, groupEnd }
export const overrideApiList = [log, info, warn, error, debug, group, groupEnd]
export const consoleAPICalledTypeMap = new Map([
  [log, 'log'],
  [debug, 'debug'],
  [info, 'info'],
  [error, 'error'],
  [warn, 'warning'],
  [group, 'startGroup'],
  [groupEnd, 'endGroup']
])
