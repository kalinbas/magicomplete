import PhraseElementBase from './PhraseElementBase';
import TokenNode from '../TokenNode';

export default class Phrase {

  elements:PhraseElementBase[];

  constructor(text:string) {
    //TODO parse structure  create elements
  }

  toTree():TokenNode {
    let root = new TokenNode();
    let nodes = [root];
    this.elements.forEach(e => {
      nodes = e.connectToNodes(nodes);
    })
    nodes.forEach(n => {
      n.isEnd = true;
    });
    return root;
  }
}
