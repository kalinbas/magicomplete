[![GitHub version](https://badge.fury.io/gh/kalinbas%2Fmagicomplete.svg)](https://badge.fury.io/gh/kalinbas%2Fmagicomplete)
[![Build Status](https://travis-ci.org/kalinbas/magicomplete.svg?branch=master)](https://travis-ci.org/kalinbas/magicomplete)

MagiComplete
====================
This will be a complete, fully tested natural language autocomplete library written in TypeScript.

It is done as a learning project for npm library / node.js / typescript development.


Demo (best way to get the full experience)
---------------------
http://demo


Included token types
---------------------

- String options
- Numbers
- Number ranges
- Dates
- Date ranges
- Custom remote autocompletes (with caching)
- ...


How to use?
--------------------

`npm install magicomplete --save`

ES6
```typescript
import Service from 'magicomplete';
```
or good, old TS import
```typescript
import Service = require('magicomplete');
```
or if you are plain, old, javascript guy
```js
var Service = require('magicomplete');
```

Example
--------------------
```typescript
import {Service, LookupToken, AutocompleteToken} from 'magicomplete';

let genreToken = new LookupToken({values:['adventure', 'action', 'fantasy']});
let yearToken = new LookupToken({min:1900, max:2016});
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
let result = service.autocomplete("i")

console.log(result); // ['i want to find', 'i'm looking for']
```

Supported platforms
--------------------

- Every desktop and mobile browser
- Node.js

If it supports JavaScript, it probably supports this library.

Contact
--------------------

kalinbas AT gmail.com 
