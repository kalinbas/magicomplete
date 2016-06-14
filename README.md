[![GitHub version](https://badge.fury.io/gh/kalinbas%2Fmagicomplete.svg)](https://badge.fury.io/gh/kalinbas%2Fmagicomplete)
[![Build Status](https://travis-ci.org/kalinbas/magicomplete.svg?branch=master)](https://travis-ci.org/kalinbas/magicomplete)

#MagiComplete

This is an experimental natural language autocomplete library written in TypeScript.

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
import {Service} from 'magicomplete';

let genreToken = new StringToken({values:['adventure', 'action', 'fantasy']});

let service = new Service({
	phrases: [ "(i want to find|i'm looking for) [genre] movies" ],
	tokens: [ { key : 'genre', type: "string", options: { values: ["Action", "Adventure", "Animation"]}	]
}); 

service.search("i").then(result => {
	console.log(result); // ['i want to find', 'i'm looking for']
});
```

###From plain old Javascript:

Get the built library file (from GitHub)

```html
<script src="demo/js/magicomplete.min.js"></script>
```

then use the global magicomplete.Service constructor. 

```js
var service = new magicomplete.Service({
	phrases: [ "(i want to find|i'm looking for) [genre] movies" ],
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
