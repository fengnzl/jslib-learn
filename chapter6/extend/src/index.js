import { cloneLoop } from '../../clone/src/index'
function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerString()
}
// 通过 Object.create(null) 创建的对象原型上没有 hasOwnProperty 属性
function hasOwnProperty(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

export function extend(defaultOpt, customOpt) {
  defaultOpt = cloneLoop(defaultOpt)
  for (let key in customOpt) {
    // 如果不是自身的属性
    if (!hasOwnProperty(customOpt, key)) {
      continue
    }
    const src = defaultOpt[key]
    const copy = customOpt[key]
    if (copy && getType(copy) === 'object') {
      // 当 defaultOpt 上该属性不是对象时
      const clone = src && getType(src) === 'object' ? src : {}
      // 递归合并
      defaultOpt[key] = extend(clone, copy)
    } else if (typeof copy !== 'undefined') {
      defaultOpt[key] = copy
    }
  }

  return defaultOpt
}
