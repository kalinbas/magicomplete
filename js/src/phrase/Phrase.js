"use strict";
var TokenNode_1 = require('../TokenNode');
var Phrase = (function () {
    function Phrase(text) {
    }
    Phrase.prototype.toTree = function () {
        var root = new TokenNode_1.default();
        var nodes = [root];
        this.elements.forEach(function (e) {
            nodes = e.connectToNodes(nodes);
        });
        nodes.forEach(function (n) {
            n.isEnd = true;
        });
        return root;
    };
    return Phrase;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Phrase;
