import TokenNode from '../TokenNode';
import TokenBase from '../tokens/TokenBase';
import PhraseElementBase from './PhraseElementBase';
export default class SinglePhraseElement extends PhraseElementBase {
    private options;
    constructor(options: ISinglePhraseElementOptions);
    getOptions(): ISinglePhraseElementOptions;
    connectToNodes(input: TokenNode[]): TokenNode[];
}
export interface ISinglePhraseElementOptions {
    token: TokenBase;
    key: string;
    isOptional: boolean;
}
