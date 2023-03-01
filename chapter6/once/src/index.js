export const once = (fn) => {
  if (typeof fn !== 'function') {
    console.warn('Once argument must be a function');
    return
  }
  let count = 0
  return function (...args) {
    if (count === 0) {
      count++
      return fn.apply(null, args)
    }
  }
}
