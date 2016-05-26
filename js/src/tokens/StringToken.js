"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TokenBase_1 = require('./TokenBase');
var CheckAndRemoveResult_1 = require('./CheckAndRemoveResult');
var StringUtil_1 = require('../util/StringUtil');
var StringToken = (function (_super) {
    __extends(StringToken, _super);
    function StringToken(options) {
        _super.call(this);
        this.options = options;
    }
    StringToken.prototype.checkAndRemove = function (text) {
        var result = new CheckAndRemoveResult_1.default();
        if (text.indexOf(this.options.value) === 0) {
            result.isValid = true;
            result.capture = this.options.value;
            result.continuation = text.substr(this.options.value.length);
        }
        if (text.length < this.options.value.length) {
            if (this.options.value.indexOf(text) === 0) {
                result.autocomplete.push(this.options.value);
            }
            else {
                var dist = StringUtil_1.default.levenshteinDistance(text, this.options.value.substr(0, text.length));
                if (dist <= 2) {
                    result.autocomplete.push(this.options.value);
                }
            }
        }
        return result;
    };
    return StringToken;
}(TokenBase_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StringToken;
