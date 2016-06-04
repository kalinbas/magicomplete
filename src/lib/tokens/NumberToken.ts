import TokenBase from './TokenBase';
import CheckAndRemoveResult from './CheckAndRemoveResult';

export default class NumberToken extends TokenBase {

  constructor(private options:any) {
    super();
  }

  checkAndRemove(text:string) {
    let result = new CheckAndRemoveResult();
    let regex = new RegExp('^(\d*\.?\d+)');
    let match = regex.exec(text);
    if (match) {
      let num = parseInt(match[1], 10);
      if (num >= this.options.min && num <= this.options.max) {
        result.isValid = true;
        result.capture = match[1];
        result.continuation = text.substr(match[1].length);
      } else if (num < this.options.min) {
        result.autocomplete.push(this.options.min + "");
      } else if (num > this.options.max) {
        result.autocomplete.push(this.options.max + "");
      }
    }

    return Promise.resolve(result);
  }
}

export interface INumberTokenOptions {
  min:number;
  max:number;
}
