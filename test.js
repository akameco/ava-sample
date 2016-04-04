import test from 'ava';
import sinon from 'sinon';
import {EventEmitter} from 'events';
import fn from './';

test.before(() => {
	sinon.stub(console, 'log');
});

test('return 2 when the value is 4', t => {
	t.is(fn.calculate(4), 2);
});

test('return 1 when the value is 3', t => {
	t.is(fn.calculate(3), 1);
});

test('throw exceptions when the value are other than numbers', t => {
	t.throws(fn.calculate);
	t.throws(() => fn.calculate(null), 'Type of numeric is expected.');
	t.throws(() => fn.calculate('abc'), / numeric /);
	t.throws(() => fn.calculate([]), TypeError, /^Type of numeric /);
});

test('print "result: 4" when the value is 8 that given from the stdin', t => {
	const ev = new EventEmitter();
	process.openStdin = sinon.stub().returns(ev);
	fn.read();
	ev.emit('data', '8');
	// t.is(console.log.callCount, 1);
	t.true(console.log.calledWith('result: 4'));
});

test('print "Type of numeric is expected." when the value is not a numeric', t => {
	const ev = new EventEmitter();
	process.openStdin = sinon.stub().returns(ev);
	fn.read();
	ev.emit('data', 'abc');
	// t.is(console.log.callCount, 1);
	t.true(console.log.calledWithMatch('Type of numeric is expected.'));
});

