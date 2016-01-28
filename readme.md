# node-trakt [![Build Status](https://travis-ci.org/wolfika/node-trakt.svg?branch=master)](https://travis-ci.org/wolfika/node-trakt)

> Trakt.tv API wrapper for Node.js


## Install

```
$ npm install --save node-trakt
```


## Usage

```js
const Trakt = require('node-trakt');

const options = {
	clientId: 'YOUR_CLIENT_ID'
};

const trakt = new Trakt(options);

trakt
	.movies('popular')
	.then(movies => {
		console.log(movies);
	})
	.catch(err => {
		console.log(err);
	});
```


## License

MIT © [Máté Farkas](https://github.com/wolfika)
