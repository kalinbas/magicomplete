"use strict";
var chai_1 = require('chai');
var SinglePhraseElement_1 = require('../../lib/phrase/SinglePhraseElement');
var MultiPhraseElement_1 = require('../../lib/phrase/MultiPhraseElement');
var Phrase_1 = require('../../lib/phrase/Phrase');
var StringToken_1 = require('../../lib/tokens/StringToken');
describe('Phrase', function () {
    it('should work with empty string', function () {
        var phrase = new Phrase_1.default("");
        chai_1.expect(phrase.element).to.be.an.instanceof(SinglePhraseElement_1.default);
    });
    it('should work with simple string', function () {
        var phrase = new Phrase_1.default("test");
        chai_1.expect(phrase.element).to.be.an.instanceof(SinglePhraseElement_1.default);
    });
    it('should throw exception with missing named token', function () {
        chai_1.expect(function () { return new Phrase_1.default("{test}", {}); }).to.throw(Error);
    });
    it('should catch named token', function () {
        var phrase = new Phrase_1.default("{test}", { test: new StringToken_1.default({ values: ['...'] }) });
        chai_1.expect(phrase.element).to.be.an.instanceof(SinglePhraseElement_1.default);
        chai_1.expect(phrase.element.getOptions().token).to.be.an.instanceof(StringToken_1.default);
    });
    it('should work with string and token', function () {
        var phrase = new Phrase_1.default("test {test}", { test: new StringToken_1.default({ values: ['...'] }) });
        chai_1.expect(phrase.element).to.be.an.instanceof(MultiPhraseElement_1.default);
        chai_1.expect(phrase.element.getOptions().isOptional).to.be.false;
        chai_1.expect(phrase.element.getOptions().isOrdered).to.be.true;
        chai_1.expect(phrase.element.getOptions().min).to.equal(2);
        chai_1.expect(phrase.element.getOptions().max).to.equal(2);
    });
    it('should work with token and string', function () {
        var phrase = new Phrase_1.default("{test} test", { test: new StringToken_1.default({ values: ['...'] }) });
        chai_1.expect(phrase.element).to.be.an.instanceof(MultiPhraseElement_1.default);
    });
    it('should create | element correctly', function () {
        var phrase = new Phrase_1.default("test|test");
        chai_1.expect(phrase.element).to.be.an.instanceof(MultiPhraseElement_1.default);
        chai_1.expect(phrase.element.getOptions().isOptional).to.be.false;
        chai_1.expect(phrase.element.getOptions().isOrdered).to.be.false;
        chai_1.expect(phrase.element.getOptions().min).to.equal(1);
        chai_1.expect(phrase.element.getOptions().max).to.equal(1);
    });
    it('should complain about wrong brackets', function () {
        chai_1.expect(function () { return new Phrase_1.default("(test|test"); }).to.throw(Error);
        chai_1.expect(function () { return new Phrase_1.default("test|test)"); }).to.throw(Error);
    });
    it('should work with empty brackets', function () {
        var phrase = new Phrase_1.default("()");
        chai_1.expect(phrase.element).to.be.an.instanceof(SinglePhraseElement_1.default);
    });
    it('should work with brackets and simple text', function () {
        var phrase = new Phrase_1.default("(test)");
        chai_1.expect(phrase.element).to.be.an.instanceof(MultiPhraseElement_1.default);
        chai_1.expect(phrase.element.getOptions().elements[0]).to.be.an.instanceof(SinglePhraseElement_1.default);
    });
    it('should work with mixed elements', function () {
        var phrase = new Phrase_1.default("(test1) test2 {test} test3 (test4)", { test: new StringToken_1.default({ values: ['...'] }) });
        chai_1.expect(phrase.element.getOptions().elements).to.have.length(5);
    });
    it('should work with options', function () {
        var phrase = new Phrase_1.default("(test|test)?>{0,2}");
        chai_1.expect(phrase.element.getOptions().isOrdered).to.be.true;
        chai_1.expect(phrase.element.getOptions().isOptional).to.be.true;
        chai_1.expect(phrase.element.getOptions().min).to.equal(0);
        chai_1.expect(phrase.element.getOptions().max).to.equal(2);
    });
    it('should fix broken indexes with options', function () {
        var phrase = new Phrase_1.default("(test){2,2}");
        chai_1.expect(phrase.element.getOptions().isOrdered).to.be.false;
        chai_1.expect(phrase.element.getOptions().isOptional).to.be.false;
        chai_1.expect(phrase.element.getOptions().min).to.equal(1);
        chai_1.expect(phrase.element.getOptions().max).to.equal(1);
    });
    it('should work with nested brackets (and crazy spaces)', function () {
        var phrase = new Phrase_1.default(" ( (  test ) ) ");
        chai_1.expect(phrase.element).to.be.an.instanceof(MultiPhraseElement_1.default);
    });
    it('should work with everything', function () {
        var phrase = new Phrase_1.default("(i want to find|i'm looking for) {test:capture1} movies (from the year {test:capture2}|with {test:capture3}|ordered by (asc|desc)?)?{0,2}", { test: new StringToken_1.default({ values: ['...'] }) });
        chai_1.expect(phrase.element.getOptions().elements).to.have.length(4);
    });
});
//# sourceMappingURL=PhraseTest.js.map