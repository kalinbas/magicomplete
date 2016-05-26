"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TokenNode_1 = require('../TokenNode');
var PhraseElementBase_1 = require('./PhraseElementBase');
var MultiPhraseElement = (function (_super) {
    __extends(MultiPhraseElement, _super);
    function MultiPhraseElement(options) {
        _super.call(this);
        this.options = options;
    }
    MultiPhraseElement.prototype.getOptions = function () {
        return this.options;
    };
    MultiPhraseElement.prototype.connectToNodes = function (input) {
        var _this = this;
        var output = [];
        for (var count = Math.max(1, this.options.min); count <= this.options.max; count++) {
            var permutations = [this.options.elements];
            permutations.forEach(function (permutation) {
                if (!_this.options.isOrdered || _this.checkOrder(permutation, _this.options.elements)) {
                    var previousChildren_1 = input;
                    permutation.forEach(function (element) {
                        previousChildren_1 = element.connectToNodes(previousChildren_1);
                        if (_this.options.separator != null && element != permutation[permutation.length - 1]) {
                            var newChildren_1 = [];
                            previousChildren_1.forEach(function (child) {
                                var n = new TokenNode_1.default();
                                n.token = _this.options.separator;
                                child.children.push(n);
                                newChildren_1.push(n);
                            });
                            previousChildren_1 = newChildren_1;
                        }
                    });
                    output.push.apply(output, previousChildren_1);
                }
            });
        }
        if (this.options.min === 0 || this.options.isOptional) {
            output.push.apply(output, input);
        }
        return output;
    };
    MultiPhraseElement.prototype.checkOrder = function (toCheck, original) {
        var lastIndex = -1;
        toCheck.forEach(function (item) {
            var index = original.indexOf(item);
            if (index < lastIndex)
                return false;
            lastIndex = index;
        });
        return true;
    };
    return MultiPhraseElement;
}(PhraseElementBase_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MultiPhraseElement;
