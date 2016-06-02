"use strict";
var TokenNode_1 = require('./TokenNode');
var StateNode_1 = require('./StateNode');
var Phrase_1 = require('./phrase/Phrase');
var Service = (function () {
    function Service(options) {
        var _this = this;
        this.options = options;
        this.root = new TokenNode_1.default();
        options.phrases.forEach(function (p) {
            var phrase = new Phrase_1.default(p, options.tokens);
            var tree = phrase.toTree();
            _this.addTree(tree, _this.root);
        });
    }
    Service.prototype.searchChildren = function (stateNode, searchState) {
        var _this = this;
        var promises = [];
        stateNode.node.children.forEach(function (node) {
            var p = node.token.checkAndRemove(stateNode.searchText).then(function (check) {
                if (check.continuation !== null) {
                    var newState = new StateNode_1.default();
                    newState.searchText = check.continuation.trim().toLowerCase();
                    newState.node = node;
                    newState.baseText = check.continuation.length === 0 ? searchState.text : searchState.text.substr(0, searchState.text.lastIndexOf(check.continuation));
                    newState.previousState = stateNode;
                    newState.capture = check.capture;
                    if (check.continuation.length === 0 && node.isEnd && check.isValid) {
                        searchState.finalState = newState;
                    }
                    return _this.searchChildren(newState, searchState);
                }
                if (check.isAnything) {
                    searchState.isAnything = check.isAnything;
                }
                if (check.autocomplete) {
                    check.autocomplete.forEach(function (val) {
                        var full = stateNode.baseText.length === 0 ? val : stateNode.baseText + " " + val;
                        searchState.autocomplete.push(full);
                    });
                }
            });
            promises.push(p);
        });
        return Promise.all(promises);
    };
    Service.prototype.search = function (text) {
        var state = new StateNode_1.default();
        state.node = this.root;
        state.baseText = "";
        state.searchText = text.trim().toLowerCase();
        var searchState = new SearchState();
        searchState.text = state.searchText;
        return this.searchChildren(state, searchState).then(function () {
            var result = new ServiceResult();
            if (searchState.finalState !== null) {
                result.isReady = true;
                var lastState = searchState.finalState;
                while (lastState != null) {
                    if (lastState.node.key != null) {
                        result.captures[lastState.node.key] = lastState.capture;
                    }
                    lastState = lastState.previousState;
                }
            }
            result.isAnything = searchState.isAnything;
            result.autocomplete = searchState.autocomplete.filter(function (value, index, self) {
                return self.indexOf(value) === index;
            });
            result.isInvalid = result.autocomplete.length === 0 && !result.isAnything && !result.isReady;
            return result;
        });
    };
    Service.prototype.searchold = function (text) {
        var result = new ServiceResult();
        var states = [];
        var finalState = null;
        var promises = [];
        var state = new StateNode_1.default();
        state.node = this.root;
        state.baseText = "";
        state.searchText = text.trim().toLowerCase();
        states.push(state);
        var _loop_1 = function() {
            var currentState = states.shift();
            currentState.node.children.forEach(function (node) {
                var p = node.token.checkAndRemove(currentState.searchText).then(function (check) {
                    if (check.continuation !== null) {
                        var newState = new StateNode_1.default();
                        newState.searchText = check.continuation.trim().toLowerCase();
                        newState.node = node;
                        newState.baseText = check.continuation.length === 0 ? text : text.substr(0, text.lastIndexOf(check.continuation));
                        newState.previousState = currentState;
                        newState.capture = check.capture;
                        states.push(newState);
                        if (check.continuation.length === 0 && node.isEnd && check.isValid) {
                            finalState = newState;
                        }
                    }
                    if (check.isAnything) {
                        result.isAnything = check.isAnything;
                    }
                    if (check.autocomplete) {
                        check.autocomplete.forEach(function (val) {
                            var full = currentState.baseText.length === 0 ? val : currentState.baseText + " " + val;
                            result.autocomplete.push(full);
                        });
                    }
                });
                promises.push(p);
            });
        };
        while (states.length > 0) {
            _loop_1();
        }
        return Promise.all(promises).then(function () {
            if (finalState !== null) {
                result.isReady = true;
                var lastState = finalState;
                while (lastState != null) {
                    if (lastState.node.key != null) {
                        result.captures[lastState.node.key] = lastState.capture;
                    }
                    lastState = lastState.previousState;
                }
            }
            result.autocomplete = result.autocomplete.filter(function (value, index, self) {
                return self.indexOf(value) === index;
            });
            result.isInvalid = result.autocomplete.length === 0 && !result.isAnything && !result.isReady;
            return result;
        });
    };
    Service.prototype.addTree = function (node, attachToNode) {
        var _this = this;
        node.children.forEach(function (childNode) {
            var attachToNodeChild = attachToNode.children.filter(function (x) { return x.token == childNode.token; })[0];
            if (attachToNodeChild) {
                attachToNodeChild.isEnd = attachToNodeChild.isEnd || childNode.isEnd;
            }
            else {
                attachToNodeChild = new TokenNode_1.default();
                attachToNodeChild.isEnd = childNode.isEnd;
                attachToNodeChild.token = childNode.token;
                attachToNodeChild.key = childNode.key;
                attachToNode.children.push(attachToNodeChild);
            }
            _this.addTree(childNode, attachToNodeChild);
        });
    };
    return Service;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Service;
var SearchState = (function () {
    function SearchState() {
        this.text = null;
        this.finalState = null;
        this.isAnything = false;
        this.autocomplete = [];
    }
    return SearchState;
}());
exports.SearchState = SearchState;
var ServiceResult = (function () {
    function ServiceResult() {
        this.isReady = false;
        this.isInvalid = false;
        this.isAnything = false;
        this.autocomplete = [];
        this.captures = {};
    }
    return ServiceResult;
}());
exports.ServiceResult = ServiceResult;
//# sourceMappingURL=Service.js.map