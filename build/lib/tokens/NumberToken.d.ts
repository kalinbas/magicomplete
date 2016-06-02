import TokenBase from './TokenBase';
import CheckAndRemoveResult from './CheckAndRemoveResult';
export default class NumberToken extends TokenBase {
    private options;
    constructor(options: INumberTokenOptions);
    checkAndRemove(text: string): Promise<CheckAndRemoveResult>;
}
export interface INumberTokenOptions {
    min: number;
    max: number;
}
