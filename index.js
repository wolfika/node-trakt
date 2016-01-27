'use strict';

const request = require('request-promise');

const allowedEndpoints = [
	'episodes',
	'genres',
	'movies',
	'people',
	'search',
	'seasons',
	'shows'
];

class Trakt {
	constructor(clientId) {
		this.api = 'http://api.staging.trakt.tv/';
		this.options = {
			headers: {
				'Content-Type': 'application/json',
				'User-Agent': 'node-trakt',
				'trakt-api-key': clientId,
				'trakt-api-version': '2'
			},
			json: true
		};
	}

	isAllowedEndpoint(endpoint) {
		return allowedEndpoints.indexOf(endpoint.split('/')[0]) > -1;
	}

	getOptionsWithURI(endpoint) {
		this.options.uri = this.api + endpoint;

		return this.options;
	}

	send(endpoint) {
		let options;

		if (!this.isAllowedEndpoint(endpoint)) {
			throw new Error(`Endpoint ${endpoint.split('/')[0]} not supported`);
		}

		options = this.getOptionsWithURI(endpoint);

		return request(options);
	}
}

for (let endpoint of allowedEndpoints) {
	Trakt.prototype[endpoint] = function (params) {
		return this.send(`${endpoint}/${params}`);
	};
}

module.exports = exports = Trakt;
