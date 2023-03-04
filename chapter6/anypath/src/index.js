export function setany(obj, key, val) {
  const keys = key.split('.')

  const root = keys.slice(0, -1).reduce((parent, subkey) => {
    const realKey = parseKey(subkey)
    // 键值为 a.b[].c 那么需要判断 b[] 为数组
    return (parent[realKey] = parent[realKey]
      ? parent[realKey]
      : subkey.includes('[]')
      ? []
      : {})
  }, obj)

  root[keys[keys.length - 1]] = val
}

export function getany(obj, key) {
  return key.split('.').reduce((prev, subKey) => {
    return prev === undefined ? prev : prev[parseKey(subKey)]
  }, obj)
}

function parseKey(key) {
  return key.replace('[]', '')
}
