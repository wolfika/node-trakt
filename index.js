'use strict';

const request = require('request-promise');
const _ = require('lodash');

/**
 * The list of endpoints that are currently supported by the wrapper
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
	 *
	 * @param {Object} options The options object
	 * @param {string} options.clientId Trakt.tv client ID
	 * @param {Boolean} [options.staging=false] Whether to use the staging API instead of production
	 * @throws {Error} Invalid clientId length (must be 64 characters)
	 */
	constructor(options) {
		let clientId;

		let defaults = {
			staging: false
		};

		this.api = (options.staging ? 'http://api.staging.trakt.tv/' : 'https://api-v2launch.trakt.tv');

		if (_.isObject(options) && options.hasOwnProperty('clientId')) {
			clientId = options.clientId;
		} else if (_.isString(options)) {
			clientId = options;
		}

		if (clientId.length !== 64) {
			throw new Error('Invalid clientId length (must be 64 characters)');
		}

		this.options = {
			clientId: clientId,
			headers: {
				'Content-Type': 'application/json',
				'User-Agent': 'node-trakt',
				'trakt-api-key': clientId,
				'trakt-api-version': '2'
			},
			json: true
		};

		this.options = _.defaultsDeep({}, this.options, defaults);
	}

	/**
	 * Checks if the requested endpoint is supported by the wrapper
	 *
	 * @param {string} endpoint The endpoint to check
	 * @returns {Boolean}
	 */
	isAllowedEndpoint(endpoint) {
		return allowedEndpoints.indexOf(endpoint.split('/')[0]) > -1;
	}

	/**
	 * Places the specified endpoint's URI into the options object, and
	 * returns the options object.
	 *
	 * @param {string} endpoint The endpoint (and any parameters of it) to send to the API.
	 * @returns {Object} options The options object from the trakt object
	 */
	getOptionsWithURI(endpoint) {
		this.options.uri = this.api + endpoint;

		return this.options;
	}

	/**
	 * Send a request to the Trakt API.
	 * Returns a promise.
	 *
	 * @param {string} endpoint The endpoint (and any parameters of it) to send to the API.
	 * @throws {Error} Endpoint not supported
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
