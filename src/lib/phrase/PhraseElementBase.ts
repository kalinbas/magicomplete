import TokenNode from '../TokenNode';

abstract class PhraseElementBase {
  abstract connectToNodes(input:TokenNode[]):TokenNode[];
}

export default PhraseElementBase;
