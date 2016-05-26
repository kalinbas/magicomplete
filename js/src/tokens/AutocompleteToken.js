"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TokenBase_1 = require('./TokenBase');
var CheckAndRemoveResult_1 = require('./CheckAndRemoveResult');
var AutocompleteToken = (function (_super) {
    __extends(AutocompleteToken, _super);
    function AutocompleteToken(options) {
        _super.call(this);
        this.options = options;
    }
    AutocompleteToken.prototype.checkAndRemove = function (text) {
        var result = new CheckAndRemoveResult_1.default();
        return result;
    };
    return AutocompleteToken;
}(TokenBase_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AutocompleteToken;
