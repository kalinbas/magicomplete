"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        var output = [];
        return output;
    };
    return SinglePhraseElement;
}(PhraseElementBase_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SinglePhraseElement;
