"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PhraseElementBase_1 = require('./PhraseElementBase');
var MultiPhraseElement = (function (_super) {
    __extends(MultiPhraseElement, _super);
    function MultiPhraseElement() {
        _super.apply(this, arguments);
    }
    MultiPhraseElement.prototype.connectToNodes = function (input) {
        var output = [];
        return output;
    };
    return MultiPhraseElement;
}(PhraseElementBase_1.default));
exports.MultiPhraseElement = MultiPhraseElement;
