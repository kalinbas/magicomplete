import TokenBase from './TokenBase';
import CheckAndRemoveResult from './CheckAndRemoveResult';
export default class AutocompleteToken extends TokenBase {
    private options;
    searchCache: Set<string>;
    valueCache: Set<string>;
    constructor(options: IAutocompleteTokenOptions);
    checkAndRemove(text: string): Promise<CheckAndRemoveResult>;
    private queryGetJsonService(q);
    private getResultFromCache(text);
}
export interface IAutocompleteTokenOptions {
    sourceUrlTemplate?: string;
    testSourceResult?: any;
    sourceResultTransform: (any) => string[];
    minQueryLength: number;
}
