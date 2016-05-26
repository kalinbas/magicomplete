export default class ArrayUtil {

  static permutateArrayN<T>(arr:T[], len:number):T[][] {
    var results = [];
    for (let i = 0; i < Math.pow(2, arr.length); i++) {
      if (ArrayUtil.hammingWeight(i) === len) {
        var res = [];
        for (let j = 0; j < arr.length; j++) {
          // if j-th bit is set
          if ((i & (1 << j)) !== 0) {          
            res.push(arr[j]);
          }
        }
        results.push(...this.permutateArray(res));
      }
    }
    return results;
  }

  static permutateArray<T>(arr:T[]):T[][] {
    var results = [];
    function permute(arr:T[], memo?:T[]):T[][] {
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
  }

  static hammingWeight(i) {
    i = i - ((i >> 1) & 0x55555555);
    i = (i & 0x33333333) + ((i >> 2) & 0x33333333);
    return ((i + (i >> 4) & 0xF0F0F0F) * 0x1010101) >> 24;
  }
}
