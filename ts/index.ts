export {default as Service} from "./src/Service";

import Service from "./src/Service";

import LookupToken from "./src/tokens/LookupToken";
import NumberToken from "./src/tokens/NumberToken";
import AutocompleteToken from "./src/tokens/AutocompleteToken";

let genreToken = new LookupToken({values:['adventure', 'action', 'fantasy']});
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
