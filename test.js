import test from 'ava';
import Trakt from './index';

let options = {
	clientId: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
};

let trakt = new Trakt(options);

test('new Trakt() correctly instantiates new object', t => {
	t.ok(trakt instanceof Trakt);
});

test('trakt object has correct options', t => {
	const requiredOptions = [
		'clientId',
		'headers',
		'json',
		'staging'
	];

	t.ok(trakt.options);

	for (let option of requiredOptions) {
		t.ok(trakt.options.hasOwnProperty(option));
	}
});
