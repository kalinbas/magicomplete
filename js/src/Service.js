"use strict";
var TokenNode_1 = require('./TokenNode');
var Phrase_1 = require('./phrase/Phrase');
var Service = (function () {
    function Service(options) {
        var _this = this;
        this.options = options;
        this.root = new TokenNode_1.default();
        options.phrases.forEach(function (p) {
            var phrase = new Phrase_1.default(p);
            var tree = phrase.toTree();
            _this.addTree(tree, _this.root);
        });
    }
    Service.prototype.addTree = function (node, attachToNode) {
        var _this = this;
        node.children.forEach(function (childNode) {
            var attachToNodeChild = attachToNode.children.filter(function (x) { return x.token == node.token; })[0];
            if (attachToNodeChild) {
                attachToNodeChild.isEnd = attachToNodeChild.isEnd || childNode.isEnd;
            }
            else {
                attachToNodeChild = new TokenNode_1.default();
                attachToNodeChild.isEnd = childNode.isEnd;
                attachToNodeChild.token = childNode.token;
                attachToNodeChild.key = childNode.key;
                attachToNode.children.push(attachToNodeChild);
            }
            _this.addTree(childNode, attachToNodeChild);
        });
    };
    return Service;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Service;
