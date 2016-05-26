import TokenNode from './TokenNode';
import Phrase from './phrase/Phrase';

export default class Service {

  root:TokenNode;

  constructor(private options:IServiceOptions) {
    this.root = new TokenNode();
    options.phrases.forEach(p => {
      let phrase = new Phrase(p);
      let tree = phrase.toTree();
      this.addTree(tree, this.root);
    });
  }

  addTree(node:TokenNode, attachToNode:TokenNode) {
    node.children.forEach(childNode => {
      // check if token available
      var attachToNodeChild = attachToNode.children.filter(x => x.token == node.token)[0];
      if (attachToNodeChild)
      {
        attachToNodeChild.isEnd = attachToNodeChild.isEnd || childNode.isEnd;
      }
      else
      {
        attachToNodeChild = new TokenNode();
        attachToNodeChild.isEnd = childNode.isEnd;
        attachToNodeChild.token = childNode.token;
        attachToNodeChild.key = childNode.key;
        attachToNode.children.push(attachToNodeChild);
      }
      this.addTree(childNode, attachToNodeChild);
    });
  }
}

export interface IServiceOptions {
  phrases:string[],
  tokens:any
}
