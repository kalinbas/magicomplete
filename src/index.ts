export {default as Service} from "./lib/Service";

import Service from "./lib/Service";

import * as http from "http";


import AutocompleteToken from './lib/tokens/AutocompleteToken';
import CheckAndRemoveResult from './lib/tokens/CheckAndRemoveResult';

let token = new AutocompleteToken({
	minQueryLength: 2,
	sourceUrlTemplate: "http://www.omdbapi.com/?s={q}",
	sourceResultTransform: (obj) => {
		return obj.Search.map(o => { return o.Title; });
	}
});
token.checkAndRemove("The hobbit").then(res => {
	console.log(JSON.stringify(res));
});
