import TokenNode from '../TokenNode';
import PhraseElementBase from './PhraseElementBase';

export default class MultiPhraseElement extends PhraseElementBase {

  constructor(private options:IMultiPhraseElementOptions) {
    super();
  }

  getOptions():IMultiPhraseElementOptions {
    return this.options;
  }

  connectToNodes(input:TokenNode[]):TokenNode[] {
    var output = [];

    return output;
  }
}

export interface IMultiPhraseElementOptions {
  elements:PhraseElementBase[];
  min:number;
  max:number;
  isOptional:boolean;
  isOrdered:boolean;
}
