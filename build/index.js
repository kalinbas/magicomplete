"use strict";
var Service_1 = require("./lib/Service");
exports.Service = Service_1.default;
var Service_2 = require("./lib/Service");
var StringToken_1 = require("./lib/tokens/StringToken");
var NumberToken_1 = require("./lib/tokens/NumberToken");
var AutocompleteToken_1 = require("./lib/tokens/AutocompleteToken");
var genreToken = new StringToken_1.default({ values: ['adventure', 'action', 'fantasy'] });
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
//# sourceMappingURL=index.js.map