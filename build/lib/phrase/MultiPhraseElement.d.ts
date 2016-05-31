import TokenNode from '../TokenNode';
import TokenBase from '../tokens/TokenBase';
import PhraseElementBase from './PhraseElementBase';
export default class MultiPhraseElement extends PhraseElementBase {
    private options;
    constructor(options: IMultiPhraseElementOptions);
    getOptions(): IMultiPhraseElementOptions;
    connectToNodes(input: TokenNode[]): TokenNode[];
    checkOrder(toCheck: PhraseElementBase[], original: PhraseElementBase[]): boolean;
}
export interface IMultiPhraseElementOptions {
    elements: PhraseElementBase[];
    min: number;
    max: number;
    isOptional: boolean;
    isOrdered: boolean;
    separator?: TokenBase;
}
