"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TokenBase_1 = require('./TokenBase');
var CheckAndRemoveResult_1 = require('./CheckAndRemoveResult');
var http = require('http');
var StringUtil_1 = require('../util/StringUtil');
var AutocompleteToken = (function (_super) {
    __extends(AutocompleteToken, _super);
    function AutocompleteToken(options) {
        _super.call(this);
        this.options = options;
        this.searchCache = new Set();
        this.valueCache = new Set();
    }
    AutocompleteToken.prototype.checkAndRemove = function (text) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            if (!_this.searchCache.has(text) && text.length >= _this.options.minQueryLength) {
                _this.queryGetJsonService(text).then(function (json) {
                    var values = _this.options.sourceResultTransform(json);
                    if (values) {
                        values.forEach(function (v) { _this.valueCache.add(v); });
                    }
                    _this.searchCache.add(text);
                    resolve(_this.getResultFromCache(text));
                });
            }
            else {
                resolve(_this.getResultFromCache(text));
            }
        });
        return p;
    };
    AutocompleteToken.prototype.queryGetJsonService = function (q) {
        var _this = this;
        if (this.options.testSourceResult) {
            return Promise.resolve(this.options.testSourceResult);
        }
        var p = new Promise(function (resolve, reject) {
            http.get(_this.options.sourceUrlTemplate.replace("{q}", q), function (res) {
                var json = "";
                res.on('data', function (chunk) { json += chunk; });
                res.on('error', function () { reject(); });
                res.on('end', function () {
                    var obj = JSON.parse(json);
                    resolve(obj);
                });
            });
        });
        return p;
    };
    AutocompleteToken.prototype.getResultFromCache = function (text) {
        var result = new CheckAndRemoveResult_1.default();
        this.valueCache.forEach(function (val) {
            if (text.indexOf(val) === 0) {
                result.isValid = true;
                result.capture = val;
                result.continuation = text.substr(val.length);
            }
            if (text.length < val.length) {
                if (val.indexOf(text) === 0) {
                    result.autocomplete.push(val);
                }
                else {
                    var dist = StringUtil_1.default.levenshteinDistance(text, val.substr(0, text.length));
                    if (dist <= 2) {
                        result.autocomplete.push(val);
                    }
                }
            }
        });
        return result;
    };
    return AutocompleteToken;
}(TokenBase_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AutocompleteToken;
//# sourceMappingURL=AutocompleteToken.js.map