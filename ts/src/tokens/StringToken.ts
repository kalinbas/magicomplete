import TokenBase from './TokenBase';
import CheckAndRemoveResult from './CheckAndRemoveResult';

import StringUtil from '../util/StringUtil';

export default class StringToken extends TokenBase {

  constructor(private options:IStringTokenOptions) {
    super();
  }

  checkAndRemove(text:string) {
    let result = new CheckAndRemoveResult();

    // if text starts with value
    if (text.indexOf(this.options.value) === 0) {
      result.isValid = true;
      result.capture = this.options.value;
      result.continuation = text.substr(this.options.value.length);
    }
    // if value starts with text
    if (text.length < this.options.value.length) {
      if (this.options.value.indexOf(text) === 0) {
        result.autocomplete.push(this.options.value);
      } else {
        // if text is similar to text
        let dist = StringUtil.levenshteinDistance(text, this.options.value.substr(0, text.length));
        if (dist <= 2) {
          result.autocomplete.push(this.options.value);
        }
      }
    }

    return result;
  }


}

export interface IStringTokenOptions {
  value:string;
}
