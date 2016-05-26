import TokenBase from './TokenBase';
import CheckAndRemoveResult from './CheckAndRemoveResult';
export default class LookupToken extends TokenBase {
    private options;
    constructor(options: ILookupTokenOptions);
    checkAndRemove(text: string): CheckAndRemoveResult;
}
export interface ILookupTokenOptions {
    values: string[];
}
