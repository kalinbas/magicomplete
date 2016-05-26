import TokenBase from './TokenBase';
import CheckAndRemoveResult from './CheckAndRemoveResult';

export default class StringToken extends TokenBase {

  constructor(private options:IStringTokenOptions) {
    super();
  }

  checkAndRemove(text:string) {
    let result = new CheckAndRemoveResult();

    return result;
  }
}

export interface IStringTokenOptions {
  value:string;
}
