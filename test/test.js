var assert = require('assert');

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
        assert.equal([1,2,3].indexOf(4), -1);
    })
    it('should return value when value of given index is present', () => {
        assert.equal([1,2,3].indexOf(1), 0);
        assert.equal([1,2,3].indexOf(2), 1);
    })
  })  
})
