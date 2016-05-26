"use strict";
var ArrayUtil = (function () {
    function ArrayUtil() {
    }
    ArrayUtil.permutateArrayN = function (arr, len) {
        var results = [];
        for (var i = 0; i < Math.pow(2, arr.length); i++) {
            if (ArrayUtil.hammingWeight(i) === len) {
                var res = [];
                for (var j = 0; j < arr.length; j++) {
                    if ((i & (1 << j)) !== 0) {
                        res.push(arr[j]);
                    }
                }
                results.push.apply(results, this.permutateArray(res));
            }
        }
        return results;
    };
    ArrayUtil.permutateArray = function (arr) {
        var results = [];
        function permute(arr, memo) {
            var cur, memo = memo || [];
            for (var i = 0; i < arr.length; i++) {
                cur = arr.splice(i, 1);
                if (arr.length === 0) {
                    results.push(memo.concat(cur));
                }
                permute(arr.slice(), memo.concat(cur));
                arr.splice(i, 0, cur[0]);
            }
            return results;
        }
        return permute(arr);
    };
    ArrayUtil.hammingWeight = function (i) {
        i = i - ((i >> 1) & 0x55555555);
        i = (i & 0x33333333) + ((i >> 2) & 0x33333333);
        return ((i + (i >> 4) & 0xF0F0F0F) * 0x1010101) >> 24;
    };
    return ArrayUtil;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ArrayUtil;
