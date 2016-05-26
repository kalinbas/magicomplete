import TokenNode from '../TokenNode';
import PhraseElementBase from './PhraseElementBase';

export abstract class MultiPhraseElement extends PhraseElementBase {
  connectToNodes(input:TokenNode[]):TokenNode[] {
    var output = [];


    return output;
  }
}
