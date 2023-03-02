function createData(deep, breadth) {
  const data = {}
  let temp = data
  for (let i = 0; i < deep; i++) {
    temp = temp.data = {}
    for (let j = 0; j < breadth; j++) {
      temp[j] = j
    }
  }
  return data
}

console.log(createData(1, 3))
console.log(createData(3, 0))

function getType(data) {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
}

function clone(source) {
  const t = getType(source)
  if (t !== 'object' && t !== 'array') {
    return source
  }
  let target
  if (t === 'object') {
    target = {}
    for (let i in source) {
      if (source.hasOwnProperty(i)) {
        if (typeof source[i] === 'object') {
          target[i] = clone(source[i])
        } else {
          target[i] = source[i]
        }
      }
    }
  } else {
    target = []
    for (let i = 0; i < source.length; i++) {
      if (typeof source[i] === 'object') {
        target[i] = clone(source[i])
      } else {
        target[i] = source[i]
      }
    }
  }
  return target
}

clone(createData(1000))
clone(createData(10000)) // 栈溢出
clone(createData(3, 100000)) // 广度大不会栈溢出
