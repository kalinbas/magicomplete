import TokenNode from '../TokenNode';
import TokenBase from '../tokens/TokenBase';
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

    for (let count = Math.max(1, this.options.min); count <= this.options.max; count++) {
        let permutations = [this.options.elements]; //TODO
        permutations.forEach(permutation => {
          if (!this.options.isOrdered || this.checkOrder(permutation, this.options.elements)) {
            let previousChildren = input;
            permutation.forEach(element => {
              previousChildren = element.connectToNodes(previousChildren);
              // add separator token - if specified
              if (this.options.separator != null && element != permutation[permutation.length - 1]) {
                  let newChildren:TokenNode[] = [];
                  previousChildren.forEach(child => {
                      let n = new TokenNode();
                      n.token = this.options.separator;
                      child.children.push(n);
                      newChildren.push(n);
                  });
                  previousChildren = newChildren;
              }
            });
            output.push(...previousChildren);
          }
        });
    }

    if (this.options.min === 0 || this.options.isOptional) {
      output.push(...input);
    }

    return output;
  }

  checkOrder(toCheck:PhraseElementBase[], original:PhraseElementBase[])
  {
      let lastIndex:number = -1;
      toCheck.forEach(item => {
        let index = original.indexOf(item);
        if (index < lastIndex) return false;
        lastIndex = index;
      });
      return true;
  }
}

export interface IMultiPhraseElementOptions {
  elements:PhraseElementBase[];
  min:number;
  max:number;
  isOptional:boolean;
  isOrdered:boolean;
  separator?:TokenBase;
}
