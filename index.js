'use strict';

function calculate(num) {
	if (typeof num !== 'number' || isNaN(num)) {
		throw new TypeError('Type of numeric is expected.');
	}

	return Math.floor(num / 2);
}

function read() {
	process.openStdin().on('data', function(chunk) {
		var param = Number(chunk);
		try {
			var result = calculate(param);
			console.log('result: ' + result);
		} catch (e) {
			console.log(String(e));
		}
	});
}

exports.calculate = calculate;
exports.read = read;
