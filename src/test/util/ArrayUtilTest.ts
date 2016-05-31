import {expect} from 'chai';

import ArrayUtil from '../../lib/util/ArrayUtil';

/**
 * Unit tests
 */
describe('ArrayUtil', () => {

  it('hammingWeight should work', () => {
      expect(ArrayUtil.hammingWeight(0)).to.eq(0);
      expect(ArrayUtil.hammingWeight(1)).to.eq(1);
      expect(ArrayUtil.hammingWeight(89)).to.eq(4);
  });

  it('permutateArray should work', () => {
      expect(ArrayUtil.permutateArray([])).to.have.length(0);
      expect(ArrayUtil.permutateArray([1])).to.have.length(1);
      expect(ArrayUtil.permutateArray([1,2])).to.have.length(2);
      expect(ArrayUtil.permutateArray([1,2,3])).to.have.length(6);
  });

  it('permutateArrayN should work', () => {
      expect(ArrayUtil.permutateArrayN([], 0)).to.have.length(0);
      expect(ArrayUtil.permutateArrayN([], 1)).to.have.length(0);
      expect(ArrayUtil.permutateArrayN([1,2,3], 0)).to.have.length(0);
      expect(ArrayUtil.permutateArrayN([1,2,3], 1)).to.have.length(3);
      expect(ArrayUtil.permutateArrayN([1,2,3], 2)).to.have.length(6);
      expect(ArrayUtil.permutateArrayN([1,2,3], 3)).to.have.length(6);
      expect(ArrayUtil.permutateArrayN([1,2,3], 4)).to.have.length(0);
  });

});
