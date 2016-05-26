import * from './TokenBase';

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
