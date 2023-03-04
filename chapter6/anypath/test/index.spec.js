import { setany, getany } from '../src/index'
import { expect, describe, it } from 'vitest'
import { isEqual } from '../../isEqual/src'

describe('anypath', () => [
  describe('setany', () => {
    it('path includes []', () => {
      const obj = { a: 1 }
      setany(obj, 'b.c[].1', 2)
      expect(isEqual(obj, { a: 1, b: { c: [undefined, 2] } })).toBe(true)
    })
    it('nested property', () => {
      const obj = { a: 1 }
      setany(obj, 'b.c.d.e', 'f')
      expect(isEqual(obj, { a: 1, b: { c: { d: { e: 'f' } } } })).toBe(true)
    })
  }),
  describe('getany', () => {
    it('get array property', () => {
      const obj = { a: 1, b: { c: [undefined, 2] } }
      expect(getany(obj, 'b.c[].1')).toEqual(2)
      expect(getany(obj, 'b.c[].0')).toEqual(undefined)
    })
    it('get obj property', () => {
      const obj = { a: 1, b: { c: { d: { e: 'f' } } } }
      expect(getany(obj, 'b.c.d.e')).toEqual('f')
    })
    it('key does not exist', () => {
      const obj = { a: 1 }
      expect(getany(obj, 'c.d')).toEqual(undefined)
    })
  }),
])
