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


    return output;
  }
}

export interface ISinglePhraseElementOptions {
  token:TokenBase;
  key:string;
  isOptional:boolean;
}
