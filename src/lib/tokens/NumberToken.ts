import TokenBase from './TokenBase';
import CheckAndRemoveResult from './CheckAndRemoveResult';

export default class NumberToken extends TokenBase {

  constructor(private options:any) {
    super();
  }

  checkAndRemove(text:string) {
    let result = new CheckAndRemoveResult();
    let match = /^(\d+\.?\d*)(\s|$)/.exec(text);
    if (match) {
      let num = parseFloat(match[1]);
      if (num >= this.options.min && num <= this.options.max) {
        // if precision is ok
        if (Math.abs((num / this.options.step) - Math.round(num / this.options.step)) < 0.00000001) {
          result.isValid = true;
          result.capture = match[1];
          result.continuation = text.substr(match[1].length);
        } else {
          // to exact - error
        }
      } else if (num < this.options.min) {
        result.isAnything = true;
        //result.autocomplete.push(this.options.min + "");
      } else if (num > this.options.max) {
        result.autocomplete.push(this.options.max + "");
      }
    }
    if (!text) {
      result.isAnything = true;
    }

    return Promise.resolve(result);
  }
}

export interface INumberTokenOptions {
  min:number;
  max:number;
  step:number;
}
