import { expect, it, describe } from 'vitest'
import { isEqual } from '../src/index.js'

describe('isEqual', () => {
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
})
