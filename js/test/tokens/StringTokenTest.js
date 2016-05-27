"use strict";
var chai_1 = require('chai');
var StringToken_1 = require('../../src/tokens/StringToken');
describe('StringToken', function () {
    it('should do autocomplete', function () {
        var token = new StringToken_1.default({ values: ["foo"] });
        var res = token.checkAndRemove("f");
        chai_1.expect(res.autocomplete[0]).to.eq("foo");
    });
    it('should do autocomplete + fix', function () {
        var token = new StringToken_1.default({ values: ["foo"] });
        var res = token.checkAndRemove("fa");
        chai_1.expect(res.autocomplete[0]).to.eq("foo");
    });
});
