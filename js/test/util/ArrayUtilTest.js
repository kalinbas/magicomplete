"use strict";
var chai_1 = require('chai');
var ArrayUtil_1 = require('../../src/util/ArrayUtil');
describe('ArrayUtil', function () {
    it('hammingWeight should work', function () {
        chai_1.expect(ArrayUtil_1.default.hammingWeight(0)).to.eq(0);
        chai_1.expect(ArrayUtil_1.default.hammingWeight(1)).to.eq(1);
        chai_1.expect(ArrayUtil_1.default.hammingWeight(89)).to.eq(4);
    });
    it('permutateArray should work', function () {
        chai_1.expect(ArrayUtil_1.default.permutateArray([])).to.have.length(0);
        chai_1.expect(ArrayUtil_1.default.permutateArray([1])).to.have.length(1);
        chai_1.expect(ArrayUtil_1.default.permutateArray([1, 2])).to.have.length(2);
        chai_1.expect(ArrayUtil_1.default.permutateArray([1, 2, 3])).to.have.length(6);
    });
    it('permutateArrayN should work', function () {
        chai_1.expect(ArrayUtil_1.default.permutateArrayN([], 0)).to.have.length(0);
        chai_1.expect(ArrayUtil_1.default.permutateArrayN([], 1)).to.have.length(0);
        chai_1.expect(ArrayUtil_1.default.permutateArrayN([1, 2, 3], 0)).to.have.length(0);
        chai_1.expect(ArrayUtil_1.default.permutateArrayN([1, 2, 3], 1)).to.have.length(3);
        chai_1.expect(ArrayUtil_1.default.permutateArrayN([1, 2, 3], 2)).to.have.length(6);
        chai_1.expect(ArrayUtil_1.default.permutateArrayN([1, 2, 3], 3)).to.have.length(6);
        chai_1.expect(ArrayUtil_1.default.permutateArrayN([1, 2, 3], 4)).to.have.length(0);
    });
});
