import TokenBase from './TokenBase';
import CheckAndRemoveResult from './CheckAndRemoveResult';

import StringUtil from '../util/StringUtil';

export default class StringToken extends TokenBase {

  constructor(private options: any) {
    super();
  }

  checkAndRemove(text: string) {

    let result = new CheckAndRemoveResult();
    let foundLength = 0;

    this.options.values.forEach(val => {
      // if text starts with value
      if (text.toLowerCase().indexOf(val.toLowerCase()) === 0) {
        // find longest possible match
        if (val.length > foundLength) {
          result.isValid = true;
          result.capture = val;
          result.continuation = text.substr(val.length);
          foundLength = val.length;
        }
      }
      // if value starts with text
      if (text.length < val.length) {
        if (val.toLowerCase().indexOf(text.toLowerCase()) === 0) {
          result.autocomplete.push(val);
        } else {
          // if text is similar to text
          let dist = StringUtil.levenshteinDistance(text.toLowerCase(), val.substr(0, text.length).toLowerCase());
          if (dist <= 2) {
            result.autocomplete.push(val);
          }
        }
      }
    });

    return Promise.resolve(result);
  }


}

export interface IStringTokenOptions {
  values: string[];
}
