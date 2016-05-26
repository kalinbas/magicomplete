"use strict";
var StringToken_1 = require('../tokens/StringToken');
var SinglePhraseElement_1 = require('./SinglePhraseElement');
var MultiPhraseElement_1 = require('./MultiPhraseElement');
var TokenNode_1 = require('../TokenNode');
var Phrase = (function () {
    function Phrase(text, tokens) {
        if (tokens === void 0) { tokens = null; }
        this.tokens = tokens;
        this.element = this.parse(text, 0);
    }
    Phrase.prototype.toTree = function () {
        var root = new TokenNode_1.default();
        var nodes = [root];
        nodes = this.element.connectToNodes(nodes);
        nodes.forEach(function (n) {
            n.isEnd = true;
        });
        return root;
    };
    Phrase.prototype.parse = function (text, level) {
        text = text.trim();
        var currentOrPart = [];
        var orParts = [currentOrPart];
        var lastBlockStart = 0;
        var bracketCount = 0;
        for (var i = 0; i < text.length; i++) {
            var c = text[i];
            if (bracketCount === 0) {
                if (c === '(' || c === '{' || c === '|' || i === text.length - 1) {
                    if (i - lastBlockStart > 0) {
                        var blockText = i === text.length - 1 ? text.substr(lastBlockStart) : text.substr(lastBlockStart, i - lastBlockStart);
                        blockText = blockText.trim();
                        if (blockText.length > 0) {
                            currentOrPart.push(new SinglePhraseElement_1.default({ token: new StringToken_1.default({ value: blockText }), isOptional: false, key: null }));
                        }
                    }
                    if (c === '|') {
                        currentOrPart = [];
                        orParts.push(currentOrPart);
                    }
                    lastBlockStart = i + 1;
                }
                if (c === '{') {
                    var endIndex = text.indexOf('}', i + 1);
                    var isOptional = false;
                    if (endIndex === -1)
                        throw new Error("Invalid configuration - missing } at " + i);
                    var name_1 = text.substr(i + 1, endIndex - i - 1);
                    var nameValues = name_1.split(":");
                    i = endIndex;
                    if (text.length > i + 1 && text[i + 1] === '?') {
                        isOptional = true;
                        i++;
                    }
                    lastBlockStart = i + 1;
                    if (!this.tokens[nameValues[0]])
                        throw new Error("Missing token configuration with name " + nameValues[0]);
                    currentOrPart.push(new SinglePhraseElement_1.default({ token: this.tokens[nameValues[0]], isOptional: isOptional, key: nameValues[1] }));
                }
            }
            if (c === '(') {
                bracketCount++;
            }
            else if (c === ')') {
                bracketCount--;
                if (bracketCount === 0) {
                    var endIndex = i;
                    var isOptional = false;
                    var isOrdered = false;
                    var range = [];
                    if (text.length > i + 1 && text[i + 1] === '?') {
                        isOptional = true;
                        i++;
                    }
                    if (text.length > i + 1 && text[i + 1] === '>') {
                        isOrdered = true;
                        i++;
                    }
                    if (text.length > i + 1 && text[i + 1] === '{') {
                        var endConfigIndex = text.indexOf('}', i + 1);
                        if (endConfigIndex === -1)
                            throw new Error("Invalid configuration - missing } at " + i);
                        var config = text.substr(i + 2, endConfigIndex - i - 2);
                        range = config.split(',');
                        i = endConfigIndex;
                    }
                    if (endIndex - lastBlockStart > 0) {
                        var textInBrackets = text.substr(lastBlockStart, endIndex - lastBlockStart);
                        var childElement = this.parse(textInBrackets, level + 1);
                        var childElements = void 0;
                        if (childElement instanceof SinglePhraseElement_1.default) {
                            childElements = [childElement];
                        }
                        else {
                            childElements = childElement.getOptions().elements;
                        }
                        var min = range.length > 0 ? parseInt(range[0], 10) : childElements.length;
                        var max = range.length > 1 ? parseInt(range[1], 10) : childElements.length;
                        min = Math.max(Math.min(childElements.length, min), 0);
                        max = Math.max(Math.min(childElements.length, max), 0);
                        currentOrPart.push(new MultiPhraseElement_1.default({ elements: childElements, isOrdered: isOrdered, isOptional: isOptional, min: min, max: max }));
                    }
                    lastBlockStart = i + 1;
                }
            }
        }
        if (bracketCount !== 0) {
            throw new Error("Invalid configuration - brackets invalid.");
        }
        var orResult = [];
        for (var _i = 0, orParts_1 = orParts; _i < orParts_1.length; _i++) {
            var orPart = orParts_1[_i];
            if (orPart.length > 1) {
                orResult.push(new MultiPhraseElement_1.default({ elements: orPart, min: orPart.length, max: orPart.length, isOrdered: true, isOptional: false }));
            }
            else if (orPart.length === 1) {
                orResult.push(orPart[0]);
            }
        }
        if (orResult.length > 1) {
            return new MultiPhraseElement_1.default({ elements: orResult, min: 1, max: 1, isOrdered: false, isOptional: false });
        }
        else if (orResult.length === 1) {
            return orResult[0];
        }
        else {
            return new SinglePhraseElement_1.default({ key: null, isOptional: false, token: null });
        }
    };
    return Phrase;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Phrase;
