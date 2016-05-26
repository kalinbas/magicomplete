import TokenNode from '../TokenNode';
import PhraseElementBase from './PhraseElementBase';
export declare abstract class MultiPhraseElement extends PhraseElementBase {
    connectToNodes(input: TokenNode[]): TokenNode[];
}
