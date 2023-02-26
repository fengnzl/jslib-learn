import { type } from './type'

Array.from('abc')
export function clone(data) {
  const t = type(data)
  if (t !== 'object' && t !== 'array') {
    return data
  }
  let target
  if (t === 'object') {
    target = {}
    for (let i in data) {
      if (data.hasOwnProperty(i)) {
        target[i] = clone(data[i])
      }
    }
  } else {
    target = []
    for (let i = 0; i < data.length; i++) {
      target[i] = clone(data[i])
    }
  }
  return target
}
