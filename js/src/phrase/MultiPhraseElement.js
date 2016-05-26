"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        var output = [];
        return output;
    };
    return MultiPhraseElement;
}(PhraseElementBase_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MultiPhraseElement;
