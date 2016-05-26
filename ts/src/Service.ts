import TokenNode from './TokenNode';
import StateNode from './StateNode';
import Phrase from './phrase/Phrase';

export default class Service {

  root:TokenNode;

  constructor(private options:IServiceOptions) {
    this.root = new TokenNode();
    options.phrases.forEach(p => {
      let phrase = new Phrase(p, options.tokens);
      let tree = phrase.toTree();
      this.addTree(tree, this.root);
    });
  }

  search(text:string):ServiceResult {

    let result = new ServiceResult();

    // states collection (queue)
    let states:StateNode[] = [];
    let finalState:StateNode = null;

    let state = new StateNode();
    state.node = this.root;
    state.baseText = "";
    state.searchText = text.trim().toLowerCase();
    states.push(state);

    while(states.length > 0) {
      let currentState = states.shift();
      currentState.node.children.forEach(node => {
          let check = node.token.checkAndRemove(currentState.searchText);

          if (check.continuation !== null) {

            let newState = new StateNode();
            newState.searchText = check.continuation.trim().toLowerCase();
            newState.node = node;
            newState.baseText = check.continuation.length === 0 ? text : text.substr(0, text.lastIndexOf(check.continuation) - 1);
            newState.previousState = currentState;
            newState.capture = check.capture;
            states.push(newState);

            // save final state when empty continuation & node is end possible & valid state of last check
            if (check.continuation.length === 0 && node.isEnd && check.isValid)
            {
                finalState = newState;
            }
          }
          if (check.isAnything) {
            result.isAnything = check.isAnything;
          }
          if (check.autocomplete)
          {
            check.autocomplete.forEach(val =>  {
              var full = currentState.baseText.length === 0 ? val : currentState.baseText + " " + val;
              result.autocomplete.push(full);
            });
          }
      });
    }



    // collect captured variables
    if (finalState !== null) {
        result.isReady = true;
        var lastState = finalState;
        while (lastState != null)
        {
            if (lastState.node.key != null)
            {
                result.captures[lastState.node.key] = lastState.capture;
            }
            lastState = lastState.previousState;
        }
    }

    //TODO sort handling / filter handling / .. etc..

    // distinct values
    result.autocomplete = result.autocomplete.filter((value, index, self) => {
        return self.indexOf(value) === index;
    });

    result.isInvalid = result.autocomplete.length === 0 && !result.isAnything && !result.isReady;

    return result;
  }

  private addTree(node:TokenNode, attachToNode:TokenNode) {
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
  tokens?:any
}

export class ServiceResult {
  isReady:boolean = false;
  isInvalid:boolean = false;
  isAnything:boolean = false;
  autocomplete:string[] = [];
  captures:any = {};
}
