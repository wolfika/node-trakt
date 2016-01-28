# node-trakt [![Build Status](https://travis-ci.org/wolfika/node-trakt.svg?branch=master)](https://travis-ci.org/wolfika/node-trakt)

> Trakt.tv API wrapper for Node.js

Since this module is still under development, only a few number of API endpoints are supported, namely:

* <code>episodes</code>
* <code>genres</code>
* <code>movies</code>
* <code>people</code>
* <code>search</code>
* <code>seasons</code>
* <code>shows</code>

These endpoints require no user authentication, just a client ID from Trakt. Authenticated endpoints are coming soon.

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

## API

### Constants

<dl>
<dt><a href="#allowedEndpoints">allowedEndpoints</a> : <code>Array.&lt;string&gt;</code></dt>
<dd><p>The list of endpoints that are currently supported by the wrapper</p>
</dd>
</dl>

<a name="Trakt"></a>
### Trakt
Trakt main class

**Kind**: global class  

* [Trakt](#Trakt)
    * [new Trakt(options)](#new_Trakt_new)
    * [.isAllowedEndpoint(endpoint)](#Trakt+isAllowedEndpoint) ⇒ <code>Boolean</code>
    * [.getOptionsWithURI(endpoint)](#Trakt+getOptionsWithURI) ⇒ <code>Object</code>
    * [.send(endpoint)](#Trakt+send) ⇒ <code>Promise</code>

<a name="new_Trakt_new"></a>
#### new Trakt(options)
Initializes the trakt object.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | The options object |
| options.clientId | <code>string</code> |  | Trakt.tv client ID |
| [options.staging] | <code>Boolean</code> | <code>false</code> | Whether to use the staging API instead of production |

<a name="Trakt+isAllowedEndpoint"></a>
#### trakt.isAllowedEndpoint(endpoint) ⇒ <code>Boolean</code>
Checks if the requested endpoint is supported by the wrapper

**Kind**: instance method of <code>[Trakt](#Trakt)</code>  

| Param | Type | Description |
| --- | --- | --- |
| endpoint | <code>string</code> | The endpoint to check |

<a name="Trakt+getOptionsWithURI"></a>
#### trakt.getOptionsWithURI(endpoint) ⇒ <code>Object</code>
Places the specified endpoint's URI into the options object, and
returns the options object.

**Kind**: instance method of <code>[Trakt](#Trakt)</code>  
**Returns**: <code>Object</code> - options The options object from the trakt object  

| Param | Type | Description |
| --- | --- | --- |
| endpoint | <code>string</code> | The endpoint (and any parameters of it) to send to the API. |

<a name="Trakt+send"></a>
#### trakt.send(endpoint) ⇒ <code>Promise</code>
Send a request to the Trakt API.
Returns a promise.

**Kind**: instance method of <code>[Trakt](#Trakt)</code>  
**Throws**:

- <code>Error</code> Endpoint not supported


| Param | Type | Description |
| --- | --- | --- |
| endpoint | <code>string</code> | The endpoint (and any parameters of it) to send to the API. |

<a name="allowedEndpoints"></a>
### allowedEndpoints : <code>Array.&lt;string&gt;</code>
The list of endpoints that are currently supported by the wrapper

**Kind**: global constant  



## License

MIT © [Máté Farkas](https://github.com/wolfika)
