import TokenNode from '../TokenNode';
import PhraseElementBase from './PhraseElementBase';
export declare abstract class SinglePhraseElement extends PhraseElementBase {
    connectToNodes(input: TokenNode[]): TokenNode[];
}
