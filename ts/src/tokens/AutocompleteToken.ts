import TokenBase from './TokenBase';

export default class AutocompleteToken extends TokenBase {

  constructor(private options:IAutocompleteTokenOptions) {
    super();
  }

  checkAndRemove(text:string) {
    let result = new CheckAndRemoveResult();

    return result;
  }
}

export interface IAutocompleteTokenOptions {
  source:(q: string) => string[];
}
