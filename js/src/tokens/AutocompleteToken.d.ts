import TokenBase from './TokenBase';
import CheckAndRemoveResult from './CheckAndRemoveResult';
export default class AutocompleteToken extends TokenBase {
    private options;
    constructor(options: IAutocompleteTokenOptions);
    checkAndRemove(text: string): CheckAndRemoveResult;
}
export interface IAutocompleteTokenOptions {
    source: (q: string) => string[];
}
