"use strict";
var chai_1 = require('chai');
var Service_1 = require('../lib/Service');
var StringToken_1 = require('../lib/tokens/StringToken');
describe('Service', function () {
    it('should do simple search', function (done) {
        var service = new Service_1.default({
            phrases: [
                "i want to",
                "i would like to"
            ]
        });
        service.search("i").then(function (result) {
            chai_1.expect(result.isReady).to.be.false;
            chai_1.expect(result.isInvalid).to.be.false;
            chai_1.expect(result.isAnything).to.be.false;
            chai_1.expect(result.autocomplete).to.have.length(2);
            chai_1.expect(result.autocomplete[0]).to.eq("i want to");
            chai_1.expect(result.autocomplete[1]).to.eq("i would like to");
            chai_1.expect(result.captures).to.be.empty;
            done();
        });
    });
    it('should do simple search with optionals', function (done) {
        var token = new StringToken_1.default({ values: ["a movie"] });
        var service = new Service_1.default({
            phrases: [
                "i want to see {token:token1} {token:token2}"
            ], tokens: { token: token }
        });
        service.search("i want to see a movie a movie").then(function (result) {
            chai_1.expect(result.isReady).to.be.true;
            chai_1.expect(result.isInvalid).to.be.false;
            chai_1.expect(result.isAnything).to.be.false;
            chai_1.expect(result.autocomplete).to.have.length(0);
            chai_1.expect(result.captures.token1).to.eq("a movie");
            chai_1.expect(result.captures.token2).to.eq("a movie");
            done();
        });
    });
});
//# sourceMappingURL=ServiceTest.js.map