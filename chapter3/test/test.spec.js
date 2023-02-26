import { expect, it, describe } from 'vitest'
import { clone } from '../src/index.js'
describe('function clone', () => {
  describe('param data', () => {
    it('basic test case', () => {
      // primitive types
      expect(clone('abc')).to.equal('abc')
      // array
      const arr = [1, [2], 3]
      const cloneArr = clone(arr)
      expect(cloneArr).to.not.equal(arr) // equal means ===
      expect(cloneArr).to.eql(arr) // eql means ==

      // object
      const obj = { a: 1, b: { c: 2 } }
      const cloneObj = clone(obj)
      expect(cloneObj).to.not.equal(obj)
      expect(cloneObj).to.eql(obj)
    })
    it('edge case', () => {
      expect(clone()).to.equal(undefined)
      expect(clone(null)).to.equal(null)
      expect(clone(undefined)).to.equal(undefined)
    })
  })
})
