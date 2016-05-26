import PhraseElementBase from './PhraseElementBase';
import TokenNode from '../TokenNode';
export default class Phrase {
    elements: PhraseElementBase[];
    constructor(text: string);
    toTree(): TokenNode;
}
