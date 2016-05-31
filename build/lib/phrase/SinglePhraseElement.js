"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TokenNode_1 = require('../TokenNode');
var PhraseElementBase_1 = require('./PhraseElementBase');
var SinglePhraseElement = (function (_super) {
    __extends(SinglePhraseElement, _super);
    function SinglePhraseElement(options) {
        _super.call(this);
        this.options = options;
    }
    SinglePhraseElement.prototype.getOptions = function () {
        return this.options;
    };
    SinglePhraseElement.prototype.connectToNodes = function (input) {
        var _this = this;
        var output = [];
        input.forEach(function (node) {
            var child = new TokenNode_1.default();
            child.token = _this.options.token;
            child.key = _this.options.key;
            node.children.push(child);
            if (_this.options.isOptional) {
                output.push(node);
            }
            output.push(child);
        });
        return output;
    };
    return SinglePhraseElement;
}(PhraseElementBase_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SinglePhraseElement;
//# sourceMappingURL=SinglePhraseElement.js.map