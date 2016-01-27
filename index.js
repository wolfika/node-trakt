'use strict';

const request = require('request-promise');
const _ = require('lodash');

/**
 * The list of endpoints that are currently supported by this wrapper
 *
 * @type {string[]}
 */
const allowedEndpoints = [
	'episodes',
	'genres',
	'movies',
	'people',
	'search',
	'seasons',
	'shows'
];

/**
 * Trakt main class
 */
class Trakt {
	/**
	 * Initializes the trakt object.
	 * Accepts an options parameter, which specifies the client ID
	 * and if the consumer wants to interact with the staging API.
	 *
	 * @param options
	 */
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

	/**
	 * Checks if the requested endpoint is supported by this wrapper
	 *
	 * @param endpoint
	 * @returns {boolean}
	 */
	isAllowedEndpoint(endpoint) {
		return allowedEndpoints.indexOf(endpoint.split('/')[0]) > -1;
	}

	/**
	 * Returns the options object with the specified endpoint included
	 * as an URI.
	 *
	 * @param endpoint
	 * @returns {{headers: {Content-Type: string, User-Agent: string, trakt-api-key: string, trakt-api-version: string}, json: boolean}|*}
	 */
	getOptionsWithURI(endpoint) {
		this.options.uri = this.api + endpoint;

		return this.options;
	}

	/**
	 * Send a request to the Trakt API.
	 * Returns a promise.
	 *
	 * @param endpoint
	 * @returns {Promise}
	 */
	send(endpoint) {
		let options;

		if (!this.isAllowedEndpoint(endpoint)) {
			throw new Error(`Endpoint ${endpoint.split('/')[0]} not supported`);
		}

		options = this.getOptionsWithURI(endpoint);

		return request(options);
	}
}

/**
 * Register all allowed endpoints functions into the Trakt class
 */
for (let endpoint of allowedEndpoints) {
	Trakt.prototype[endpoint] = function (params) {
		return this.send(`${endpoint}/${params}`);
	};
}

module.exports = exports = Trakt;
