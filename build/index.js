"use strict";
var Service_1 = require("./lib/Service");
exports.Service = Service_1.default;
var Service_2 = require("./lib/Service");
var AutocompleteToken_1 = require('./lib/tokens/AutocompleteToken');
var token = new AutocompleteToken_1.default({
    minQueryLength: 2,
    sourceUrlTemplate: "http://www.omdbapi.com/?s={q}",
    sourceResultTransform: function (obj) {
        return obj.Search.map(function (o) { return o.Title; });
    }
});
var service = new Service_2.default({ phrases: ["{movie:movie}"], tokens: { movie: token } });
service.search("the hobbit").then(function (res) {
    console.log(JSON.stringify(res));
});
//# sourceMappingURL=index.js.map