"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TokenBase_1 = require('./TokenBase');
var CheckAndRemoveResult_1 = require('./CheckAndRemoveResult');
var NumberToken = (function (_super) {
    __extends(NumberToken, _super);
    function NumberToken(options) {
        _super.call(this);
        this.options = options;
    }
    NumberToken.prototype.checkAndRemove = function (text) {
        var result = new CheckAndRemoveResult_1.default();
        var regex = new RegExp('^(\d*\.?\d+)');
        var match = regex.exec(text);
        if (match) {
            var num = parseInt(match[1], 10);
            if (num >= this.options.min && num <= this.options.max) {
                result.isValid = true;
                result.capture = match[1];
                result.continuation = text.substr(match[1].length);
            }
            else if (num < this.options.min) {
                result.autocomplete.push(this.options.min + "");
            }
            else if (num > this.options.max) {
                result.autocomplete.push(this.options.max + "");
            }
        }
        return Promise.resolve(result);
    };
    return NumberToken;
}(TokenBase_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NumberToken;
//# sourceMappingURL=NumberToken.js.map