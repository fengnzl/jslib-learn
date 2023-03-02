import { expect, it, describe } from 'vitest'
import { getType, isEqual } from '../src/index.js'

describe('isEqual', () => {
  const nanMiddleware = () => {
    return (next) => (value, other) => {
      if (getType(value) === 'number' && getType(other) === 'number') {
        if (Number.isNaN(value) && Number.isNaN(other)) {
          return true
        }
      }
      return next(value, other)
    }
  }
  const functionMiddleware = () => {
    return (next) => (value, other) => {
      if (getType(value) === 'function' && getType(other) === 'function') {
        return value.toString() === other.toString()
      }
      return next(value, other)
    }
  }
  describe('same type', () => {
    it('number', () => {
      expect(isEqual(1, 1)).toBe(true)
      expect(isEqual(1, 2)).toBe(false)
    })
    it('string', () => {
      expect(isEqual('a', 'a')).toBe(true)
      expect(isEqual('c', 'd')).toBe(false)
    })
    it('object', () => {
      expect(
        isEqual(
          { a: 1, b: 'c', d: [1, 2, {}] },
          { a: 1, b: 'c', d: [1, 2, {}] }
        )
      ).toBe(true)
      expect(
        isEqual(
          { a: 1, b: 'c', d: [1, 2, {}] },
          { a: 1, b: 'd', d: [1, 2, {}] }
        )
      ).toBe(false)
    })
  })
  describe('different type', () => {
    it('string and number', () => {
      expect(isEqual(1, '2')).toBe(false)
    })
    it('null and undefined', () => {
      expect(isEqual(null, undefined)).toBe(false)
    })
  })
  describe('test enhancer', () => {
    it('NaN is not equal NaN when lack of nanMiddleware', () => {
      expect(isEqual(NaN, NaN)).toBe(false)
    })
    it('NaN is equal NaN when nanMiddleware exist', () => {
      expect(isEqual(NaN, NaN, nanMiddleware())).toBe(true)
    })
    const a1 = { a: function () {} }
    const a2 = { a: function () {} }
    it('function not equal when lack of functionMiddleware', () => {
      expect(isEqual(a1, a2)).toBe(false)
    })
    it('function is equal when functionMiddleware exist', () => {
      expect(isEqual(a1, a2, functionMiddleware())).toBe(true)
    })
  })
  describe('compose', () => {
    const compose = (...fns) => {
      if (fns.length === 0) {
        return (...args) => args
      }
      if (fns.length === 1) {
        return fns[0]
      }
      return fns.reduce(
        (a, b) =>
          (...args) =>
            a(b(...args))
      )
    }
    it('should equal when NaN and function exists', () => {
      const a1 = { a: function () {}, b: NaN }
      const a2 = { a: function () {}, b: NaN }
      expect(
        isEqual(a1, a2, compose(functionMiddleware(), nanMiddleware()))
      ).toBe(true)
    })
  })
})
