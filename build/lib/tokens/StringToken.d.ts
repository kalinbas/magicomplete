import TokenBase from './TokenBase';
import CheckAndRemoveResult from './CheckAndRemoveResult';
export default class StringToken extends TokenBase {
    private options;
    constructor(options: IStringTokenOptions);
    checkAndRemove(text: string): Promise<CheckAndRemoveResult>;
}
export interface IStringTokenOptions {
    values: string[];
}
