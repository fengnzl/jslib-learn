export function type(source){
  return Object.prototype.toString.call(source).slice(8, -1).toLowerCase()
}