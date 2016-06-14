[![GitHub version](https://badge.fury.io/gh/kalinbas%2Fmagicomplete.svg)](https://badge.fury.io/gh/kalinbas%2Fmagicomplete)
[![Build Status](https://travis-ci.org/kalinbas/magicomplete.svg?branch=master)](https://travis-ci.org/kalinbas/magicomplete)

#MagiComplete

This is an experimental natural language autocomplete library written in TypeScript.

It is done as a learning project for npm library / node.js / typescript development.

##Demo

http://kalinbas.github.io/magicomplete

##Included token types

- String options
- Numbers
- Custom remote JSON autocompletes (with caching)
- more to come...


##How to use?

###From Typescript / ES6:

Get the package from npm

`npm install magicomplete --save`

Then import it in your code

```typescript
import {Service, StringToken, AutocompleteToken} from 'magicomplete';

let genreToken = new StringToken({values:['adventure', 'action', 'fantasy']});
let yearToken = new StringToken({min:1900, max:2016});
let actorToken = new AutocompleteToken(sourceFunction);

let service = new Service({
	phrases: [
		"(i want to find|i'm looking for) {genre} movies (from the year {year}|with {actor}|ordered by (asc|desc)){0,3}"
	],
	tokens: {
		genre:genreToken,
		year:yearToken,
		actor:actorToken
	}
}); 

service.search("i").then(result => {
	console.log(result); // ['i want to find', 'i'm looking for']
});
```

###From plain old Javascript:

Get the built library file from this GitHub

```html
<script src="demo/js/magicomplete.js"></script>
```

then use the global magicomplete.Service constructor. 

```js
var service = new magicomplete.Service({
	phrases: [ "(i want to find|i'm looking for) {genre} movies" ],
	tokens: [ { key : 'genre', type: "string", options: { values: ["Action", "Adventure", "Animation"]}]	
});

service.search("i").then(function(result) {
	console.log(result); // ['i want to find', 'i'm looking for']
});
```

##Supported platforms

- Every desktop and mobile browser
- Node.js

If it supports JavaScript, it probably supports this library.

##Contact

kalinbas AT gmail.com 
