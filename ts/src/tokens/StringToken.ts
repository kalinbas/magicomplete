import TokenBase from './TokenBase';
import CheckAndRemoveResult from './CheckAndRemoveResult';

import StringUtil from '../util/StringUtil';

export default class StringToken extends TokenBase {

  constructor(private options:IStringTokenOptions) {
    super();
  }

  checkAndRemove(text:string) {
    let result = new CheckAndRemoveResult();

    this.options.values.forEach(val => {
      // if text starts with value
      if (text.indexOf(val) === 0) {
        result.isValid = true;
        result.capture = val;
        result.continuation = text.substr(val.length);
      }
      // if value starts with text
      if (text.length < val.length) {
        if (val.indexOf(text) === 0) {
          result.autocomplete.push(val);
        } else {
          // if text is similar to text
          let dist = StringUtil.levenshteinDistance(text, val.substr(0, text.length));
          if (dist <= 2) {
            result.autocomplete.push(val);
          }
        }
      }
    });

    return result;
  }


}

export interface IStringTokenOptions {
  values:string[];
}
