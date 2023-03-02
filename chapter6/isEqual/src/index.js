export function getType(val) {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
}

export function isEqual(value, other, enhancer) {
  const next = () => {
    if (value === other) {
      return true
    }
    const vType = getType(value)
    const oType = getType(other)

    if (vType !== oType) {
      return false
    }

    if (vType === 'array') {
      return equalArray(value, other, enhancer)
    }

    if (vType === 'object') {
      return equalObject(value, other, enhancer)
    }
    return value === other
  }

  if (typeof enhancer === 'function') {
    return enhancer(next)(value, other)
  }

  return next()
}

function equalArray(value, other, enhancer) {
  const vLen = value.length
  const oLen = other.length
  if (vLen !== oLen) {
    return false
  }
  for (let i = 0; i < vLen; i++) {
    if (!isEqual(value[i], other[i], enhancer)) {
      return false
    }
  }
  return true
}

function equalObject(value, other, enhancer) {
  const vKeys = Object.keys(value)
  const oKeys = Object.keys(other)
  if (vKeys.length !== oKeys.length) {
    return false
  }
  for (let i = 0; i < vKeys.length; i++) {
    const v = value[vKeys[i]]
    const o = other[vKeys[i]]
    if (!isEqual(v, o, enhancer)) {
      return false
    }
  }
  return true
}
