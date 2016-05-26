import PhraseElementBase from './PhraseElementBase';
import TokenNode from '../TokenNode';
export default class Phrase {
    element: PhraseElementBase;
    tokens: any;
    constructor(text: string, tokens?: any);
    toTree(): TokenNode;
    parse(text: string, level: number): PhraseElementBase;
}
