import PhraseElementBase from './PhraseElementBase';

import StringToken from '../tokens/StringToken';

import SinglePhraseElement from './SinglePhraseElement';
import MultiPhraseElement from './MultiPhraseElement';

import TokenNode from '../TokenNode';

export default class Phrase {

  element:PhraseElementBase;
  tokens:any;

  constructor(text:string, tokens:any = null) {
    this.tokens = tokens;
    this.element = this.parse(text, 0);
  }

  toTree():TokenNode {
    let root = new TokenNode();

    let nodes = [root];

    nodes = this.element.connectToNodes(nodes);
    nodes.forEach(n => {
      n.isEnd = true;
    });

    return root;
  }

  parse(text:string, level:number):PhraseElementBase {

    text = text.trim();

    let currentOrPart:PhraseElementBase[] = [];
    let orParts:PhraseElementBase[][] = [currentOrPart];

    let lastBlockStart = 0;
    let bracketCount = 0;

    for (let i = 0; i < text.length; i++) {
        let c = text[i];

        // if not in brackets
        if (bracketCount === 0) {

          // maybe theres a block to be finished...
          if (c === '(' || c === '[' || c === '|' || i === text.length - 1) {
            // add simple text block
            if (i - lastBlockStart > 0) {
              let blockText = i === text.length - 1 ? text.substr(lastBlockStart) : text.substr(lastBlockStart, i - lastBlockStart);
              blockText = blockText.trim();
              if (blockText.length > 0) {
                currentOrPart.push(new SinglePhraseElement({ token : new StringToken( { values : [blockText] }), isOptional : false, key : null }));
              }
            }

            // create new part
            if (c === '|') {
              currentOrPart = [];
              orParts.push(currentOrPart);
            }

            //set new block starting point
            lastBlockStart = i + 1;
          }

          // parse named token [token] or [token:captureName] or [token:captureName]?
          if (c === '[') {
            let endIndex = text.indexOf(']', i + 1);
            let isOptional = false;
            if (endIndex === -1) throw new Error("Invalid configuration - missing ] at " + i);

            let name = text.substr(i + 1, endIndex - i - 1);
            let nameValues = name.split(":");

            i = endIndex;
            // parse ? optional flag
            if (text.length > i + 1 && text[i + 1] === '?') {
              isOptional = true;
              i++;
            }

            //set new block starting point
            lastBlockStart = i + 1;

            if (!this.tokens[nameValues[0]]) throw new Error("Missing token configuration with key " + nameValues[0]);

            currentOrPart.push(new SinglePhraseElement({ token : this.tokens[nameValues[0]], isOptional : isOptional, key : nameValues[1] || nameValues[0] }));
          }
        }

        if (c === '(') {
          bracketCount++;
        } else if (c === ')') {
          bracketCount--;
          if (bracketCount === 0) {

            let endIndex = i;
            let isOptional = false;
            let isOrdered = false;
            let range = [];

            // parse ? optional flag
            if (text.length > i + 1 && text[i + 1] === '?') {
              isOptional = true;
              i++;
            }
            // parse > ordered flag
            if (text.length > i + 1 && text[i + 1] === '>') {
              isOrdered = true;
              i++;
            }
            // parse {1} or {1,3} range config
            if (text.length > i + 1 && text[i + 1] === '{') {
              let endConfigIndex = text.indexOf('}', i + 1);

              if (endConfigIndex === -1) throw new Error("Invalid configuration - missing } at " + i);

              let config = text.substr(i + 2, endConfigIndex - i - 2);

              range = config.split(',');

              i = endConfigIndex;
            }


            if (endIndex - lastBlockStart > 0) {
              let textInBrackets = text.substr(lastBlockStart, endIndex - lastBlockStart);

              // parse element in brackets
              let childElement = this.parse(textInBrackets, level + 1);

              // get elements of it
              let childElements:PhraseElementBase[];
              
              let childLengthMin = 1;  
              let childLengthMax = 1;  
              if (childElement instanceof SinglePhraseElement) {
                childElements = [childElement];
              } else {
                childElements = (<MultiPhraseElement>childElement).getOptions().elements;
                childLengthMin = (<MultiPhraseElement>childElement).getOptions().min;
                childLengthMax = (<MultiPhraseElement>childElement).getOptions().max;
                
                // special case - child is ordered list - overwrite setting
                isOrdered = isOrdered || (<MultiPhraseElement>childElement).getOptions().isOrdered;
              }

              let min = range.length > 0 ? parseInt(range[0], 10) : childLengthMin;
              let max = range.length > 1 ? parseInt(range[1], 10) : childLengthMax;

              // fix wrong numbers
              min = Math.max(Math.min(childElements.length, min), 0);
              max = Math.max(Math.min(childElements.length, max), 0);

              // TODO simplification to single phrase element if possible...
              currentOrPart.push(new MultiPhraseElement({ elements : childElements, isOrdered: isOrdered, isOptional: isOptional, min: min, max: max }))
            }
            //set new block starting point
            lastBlockStart = i + 1;
          }
        }
    }

    if (bracketCount !== 0) {
      throw new Error("Invalid configuration - brackets invalid.");
    }

    let orResult:PhraseElementBase[] = [];
    for (let orPart of orParts) {
      if (orPart.length > 1) {
        orResult.push(new MultiPhraseElement({ elements : orPart, min: orPart.length, max : orPart.length, isOrdered: true, isOptional: false }));
      } else if (orPart.length === 1) {
        orResult.push(orPart[0]);
      }
    }

    // return correct phrase element
    if (orResult.length > 1) {
      return new MultiPhraseElement({ elements : orResult, min: 1, max : 1, isOrdered: false, isOptional: false });
    } else if (orResult.length === 1) {
      return orResult[0];
    } else {
      return new SinglePhraseElement({  key: null, isOptional: false, token: null });
    }
  }
}
