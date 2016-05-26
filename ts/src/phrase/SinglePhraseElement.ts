import TokenNode from '../TokenNode';
import TokenBase from '../tokens/TokenBase';
import PhraseElementBase from './PhraseElementBase';

export default class SinglePhraseElement extends PhraseElementBase {

  constructor(private options:ISinglePhraseElementOptions) {
    super();
  }

  getOptions():ISinglePhraseElementOptions {
    return this.options;
  }

  connectToNodes(input:TokenNode[]):TokenNode[] {
    var output = [];

    input.forEach(node => {

      let child = new TokenNode();
      child.token = this.options.token;
      child.key = this.options.key;
      node.children.push(child);
      
      if (this.options.isOptional) {
        output.push(node);
      }
      output.push(child);
    });

    return output;
  }
}

export interface ISinglePhraseElementOptions {
  token:TokenBase;
  key:string;
  isOptional:boolean;
}
