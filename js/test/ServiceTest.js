"use strict";
var chai_1 = require('chai');
var Service_1 = require('../src/Service');
var StringToken_1 = require('../src/tokens/StringToken');
describe('Service', function () {
    it('should do simple search', function () {
        var service = new Service_1.default({ phrases: [
                "i want to",
                "i would like to"
            ] });
        var result = service.search("i");
        chai_1.expect(result.isReady).to.be.false;
        chai_1.expect(result.isInvalid).to.be.false;
        chai_1.expect(result.isAnything).to.be.false;
        chai_1.expect(result.autocomplete).to.have.length(2);
        chai_1.expect(result.autocomplete[0]).to.eq("i want to");
        chai_1.expect(result.autocomplete[1]).to.eq("i would like to");
        chai_1.expect(result.captures).to.be.empty;
    });
    it('should do simple search with optionals', function () {
        var token = new StringToken_1.default({ values: ["a movie"] });
        var service = new Service_1.default({ phrases: [
                "i want to see {token:token1} {token:token2}"
            ], tokens: { token: token } });
        var result = service.search("i want to see a movie a movie");
        chai_1.expect(result.isReady).to.be.true;
        chai_1.expect(result.isInvalid).to.be.false;
        chai_1.expect(result.isAnything).to.be.false;
        chai_1.expect(result.autocomplete).to.have.length(0);
        chai_1.expect(result.captures.token1).to.eq("a movie");
        chai_1.expect(result.captures.token2).to.eq("a movie");
    });
});
