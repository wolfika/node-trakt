'use strict';

const request = require('request-promise');
const _ = require('lodash');

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
	constructor(options) {
		let defaults = {
			clientId: '',
			staging: false
		};

		options = _.defaults(options, defaults);

		this.api = (options.staging ? 'http://api.staging.trakt.tv/' : 'https://api-v2launch.trakt.tv');
		this.options = {
			headers: {
				'Content-Type': 'application/json',
				'User-Agent': 'node-trakt',
				'trakt-api-key': options.clientId,
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
