"use strict";
var Service_1 = require("./src/Service");
exports.Service = Service_1.default;
var Service_2 = require("./src/Service");
var LookupToken_1 = require("./src/tokens/LookupToken");
var NumberToken_1 = require("./src/tokens/NumberToken");
var AutocompleteToken_1 = require("./src/tokens/AutocompleteToken");
var genreToken = new LookupToken_1.default({ values: ['adventure', 'action', 'fantasy'] });
var yearToken = new NumberToken_1.default({ min: 1900, max: 2016 });
var actorToken = new AutocompleteToken_1.default({ source: function (q) {
        return [q + '1', q + '2', q + '3'];
    } });
var service = new Service_2.default({
    phrases: [
        "(i want to find|i'm looking for) {genre} movies (from the year {year}|with {actor}|ordered by (asc|desc)){0,3}"
    ],
    tokens: {
        genre: genreToken,
        year: yearToken,
        actor: actorToken
    }
});
