"use strict";
var TokenNode = (function () {
    function TokenNode() {
        this.isEnd = false;
        this.token = null;
        this.key = null;
        this.children = [];
    }
    return TokenNode;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TokenNode;
