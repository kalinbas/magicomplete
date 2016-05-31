import TokenNode from '../TokenNode';
declare abstract class PhraseElementBase {
    abstract connectToNodes(input: TokenNode[]): TokenNode[];
}
export default PhraseElementBase;
