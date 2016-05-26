import TokenNode from '../TokenNode';
import PhraseElementBase from './PhraseElementBase';
export default class MultiPhraseElement extends PhraseElementBase {
    private options;
    constructor(options: IMultiPhraseElementOptions);
    getOptions(): IMultiPhraseElementOptions;
    connectToNodes(input: TokenNode[]): TokenNode[];
}
export interface IMultiPhraseElementOptions {
    elements: PhraseElementBase[];
    min: number;
    max: number;
    isOptional: boolean;
    isOrdered: boolean;
}
