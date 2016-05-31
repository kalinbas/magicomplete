export {default as Service} from "./lib/Service";

import Service from "./lib/Service";

import StringToken from "./lib/tokens/StringToken";
import NumberToken from "./lib/tokens/NumberToken";
import AutocompleteToken from "./lib/tokens/AutocompleteToken";

let genreToken = new StringToken({values:['adventure', 'action', 'fantasy']});
let yearToken = new NumberToken({min:1900, max:2016});
let actorToken = new AutocompleteToken({ source : q => {
  // TODO fake remote call
  return [q + '1', q + '2', q + '3'];
}});

let service = new Service({
	phrases: [
		"(i want to find|i'm looking for) {genre} movies (from the year {year}|with {actor}|ordered by (asc|desc)){0,3}"
	],
	tokens: {
		genre: genreToken,
		year: yearToken,
		actor: actorToken
	}
});
