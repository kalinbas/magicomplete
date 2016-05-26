import TokenBase from './TokenBase';
import CheckAndRemoveResult from './CheckAndRemoveResult';

export default class NumberToken extends TokenBase {

  constructor(private options:INumberTokenOptions) {
    super();
  }

  checkAndRemove(text:string) {
    let result = new CheckAndRemoveResult();

    return result;
  }
}

export interface INumberTokenOptions {
  min:number;
  max:number;
}
