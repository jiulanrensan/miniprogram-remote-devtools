export function queryObject(url: string) {
  const [, query] = url.split('?')
  if (!query) return {}
  const queryObject: Record<string, string> = {}
  query.split('&').forEach((item) => {
    const [key, value] = item.split('=')
    queryObject[key] = value
  })
  return queryObject
}

export function urlPath(url: string) {
  const [path] = url.split('?')
  return path
}
