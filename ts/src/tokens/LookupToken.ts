import TokenBase from './TokenBase';
import CheckAndRemoveResult from './CheckAndRemoveResult';

export default class LookupToken extends TokenBase {

  constructor(private options:ILookupTokenOptions) {
    super();
  }

  checkAndRemove(text:string) {
    let result = new CheckAndRemoveResult();

    return result;
  }
}

export interface ILookupTokenOptions {
  values:string[];
}
