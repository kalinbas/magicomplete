"use strict";
var chai_1 = require('chai');
var StringToken_1 = require('../../lib/tokens/StringToken');
describe('StringToken', function () {
    it('should do autocomplete', function (done) {
        var token = new StringToken_1.default({ values: ["foo"] });
        var res = token.checkAndRemove("f").then(function (res) {
            chai_1.expect(res.autocomplete[0]).to.eq("foo");
            done();
        });
    });
    it('should do autocomplete + fix', function (done) {
        var token = new StringToken_1.default({ values: ["foo"] });
        var res = token.checkAndRemove("fa").then(function (res) {
            chai_1.expect(res.autocomplete[0]).to.eq("foo");
            done();
        });
    });
});
//# sourceMappingURL=StringTokenTest.js.map