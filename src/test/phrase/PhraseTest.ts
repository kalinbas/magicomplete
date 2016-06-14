import {expect} from 'chai';

import SinglePhraseElement from '../../lib/phrase/SinglePhraseElement';
import MultiPhraseElement from '../../lib/phrase/MultiPhraseElement';
import Phrase from '../../lib/phrase/Phrase';

import StringToken from '../../lib/tokens/StringToken';


/**
 * Unit tests
 */
describe('Phrase', () => {

    it('should work with empty string', () => {
        let phrase = new Phrase("");
        expect(phrase.element).to.be.an.instanceof(SinglePhraseElement);
    });

    it('should work with simple string', () => {
        let phrase = new Phrase("test");
        expect(phrase.element).to.be.an.instanceof(SinglePhraseElement);
    });

    it('should throw exception with missing named token', () => {
        expect(() => new Phrase("[test]", {})).to.throw(Error);
    });

    it('should catch named token', () => {
        let phrase = new Phrase("[test]", { test: new StringToken({ values: ['...'] }) });
        expect(phrase.element).to.be.an.instanceof(SinglePhraseElement);
        expect((<SinglePhraseElement>phrase.element).getOptions().token).to.be.an.instanceof(StringToken);
    });

    it('should work with string and token', () => {
        let phrase = new Phrase("test [test]", { test: new StringToken({ values: ['...'] }) });
        expect(phrase.element).to.be.an.instanceof(MultiPhraseElement);
        expect((<MultiPhraseElement>phrase.element).getOptions().isOptional).to.be.false;
        expect((<MultiPhraseElement>phrase.element).getOptions().isOrdered).to.be.true;
        expect((<MultiPhraseElement>phrase.element).getOptions().min).to.equal(2);
        expect((<MultiPhraseElement>phrase.element).getOptions().max).to.equal(2);
    });
    it('should work with token and string', () => {
        let phrase = new Phrase("[test] test", { test: new StringToken({ values: ['...'] }) });
        expect(phrase.element).to.be.an.instanceof(MultiPhraseElement);
    });
    it('should create | element correctly', () => {
        let phrase = new Phrase("test|test");
        expect(phrase.element).to.be.an.instanceof(MultiPhraseElement);
        expect((<MultiPhraseElement>phrase.element).getOptions().isOptional).to.be.false;
        expect((<MultiPhraseElement>phrase.element).getOptions().isOrdered).to.be.false;
        expect((<MultiPhraseElement>phrase.element).getOptions().min).to.equal(1);
        expect((<MultiPhraseElement>phrase.element).getOptions().max).to.equal(1);
    });

    it('should complain about wrong brackets', () => {
        expect(() => new Phrase("(test|test")).to.throw(Error);
        expect(() => new Phrase("test|test)")).to.throw(Error);
    });
    it('should work with empty brackets', () => {
        let phrase = new Phrase("()");
        expect(phrase.element).to.be.an.instanceof(SinglePhraseElement);
    });

    it('should work with brackets and simple text', () => {
        let phrase = new Phrase("(test)");
        expect(phrase.element).to.be.an.instanceof(MultiPhraseElement);
        expect((<MultiPhraseElement>phrase.element).getOptions().elements[0]).to.be.an.instanceof(SinglePhraseElement);
    });

    it('should work with mixed elements', () => {
        let phrase = new Phrase("(test1) test2 [test] test3 (test4)", { test: new StringToken({ values: ['...'] }) });
        expect((<MultiPhraseElement>phrase.element).getOptions().elements).to.have.length(5);
    });

    it('should work without options', () => {
        let phrase = new Phrase("(test1|test2)");
        expect(phrase.element).to.be.an.instanceof(MultiPhraseElement);
        expect((<MultiPhraseElement>phrase.element).getOptions().elements).to.have.length(2);
        expect((<MultiPhraseElement>phrase.element).getOptions().isOptional).to.be.false;
        expect((<MultiPhraseElement>phrase.element).getOptions().min).to.equal(1);
        expect((<MultiPhraseElement>phrase.element).getOptions().max).to.equal(1);
    });
    
    it('should propagate quantifiers', () => {
        let phrase = new Phrase("((test1|test2){1,1}){1,2}");
        expect(phrase.element).to.be.an.instanceof(MultiPhraseElement);
        expect((<MultiPhraseElement>phrase.element).getOptions().elements).to.have.length(2);
        expect((<MultiPhraseElement>phrase.element).getOptions().isOptional).to.be.false;
        expect((<MultiPhraseElement>phrase.element).getOptions().isOrdered).to.be.false;
        expect((<MultiPhraseElement>phrase.element).getOptions().min).to.equal(1);
        expect((<MultiPhraseElement>phrase.element).getOptions().max).to.equal(2);
    });
    
     it('should propagate quantifiers II', () => {
        let phrase = new Phrase("((test1|test2){1,1} other)");
        expect(phrase.element).to.be.an.instanceof(MultiPhraseElement);
        expect((<MultiPhraseElement>phrase.element).getOptions().elements).to.have.length(2);
        expect((<MultiPhraseElement>phrase.element).getOptions().isOptional).to.be.false;
        expect((<MultiPhraseElement>phrase.element).getOptions().isOrdered).to.be.true;
        expect((<MultiPhraseElement>phrase.element).getOptions().min).to.equal(2);
        expect((<MultiPhraseElement>phrase.element).getOptions().max).to.equal(2);
    });

    it('should work with options', () => {
        let phrase = new Phrase("(test|test)?>{0,2}");
        expect((<MultiPhraseElement>phrase.element).getOptions().isOrdered).to.be.true;
        expect((<MultiPhraseElement>phrase.element).getOptions().isOptional).to.be.true;
        expect((<MultiPhraseElement>phrase.element).getOptions().min).to.equal(0);
        expect((<MultiPhraseElement>phrase.element).getOptions().max).to.equal(2);
    });

    it('should fix broken indexes with options', () => {
        let phrase = new Phrase("(test){2,2}");
        expect((<MultiPhraseElement>phrase.element).getOptions().isOrdered).to.be.false;
        expect((<MultiPhraseElement>phrase.element).getOptions().isOptional).to.be.false;
        expect((<MultiPhraseElement>phrase.element).getOptions().min).to.equal(1);
        expect((<MultiPhraseElement>phrase.element).getOptions().max).to.equal(1);
    });

    it('should work with nested brackets (and crazy spaces)', () => {
        let phrase = new Phrase(" ( (  test ) ) ");
        expect(phrase.element).to.be.an.instanceof(MultiPhraseElement);
    });

    it('should work with everything', () => {
        let phrase = new Phrase("(i want to find|i'm looking for) [test:capture1] movies (from the year [test:capture2]|with [test:capture3]|ordered by (asc|desc)?)?{0,2}", { test: new StringToken({ values: ['...'] }) });
        expect((<MultiPhraseElement>phrase.element).getOptions().elements).to.have.length(4);
    });

});
