import test from 'ava';
import { evaluate, parseContext } from '../lib/evaluate.js';

test('parseContext', t => {

	t.is(parseContext({}), '');
	t.is(parseContext({ id: 3 }), 'var id = this[\"id\"];');
});

test('Evaluate basic expression', t => {

	t.is(evaluate('"unicorns"'), 'unicorns');
	t.is(evaluate('null'), null);
	t.is(evaluate('undefined'), undefined);
	t.is(evaluate(''), undefined);
	t.is(evaluate('2+2'), 4);
});

test('Evaluate expression in context with this', t => {

	t.deepEqual(evaluate('this'), {});
	t.deepEqual(evaluate('this', {}), {});
	t.deepEqual(evaluate('this', { number: 5 }), { number: 5 });
	t.deepEqual(evaluate('this.number', { number: 5 }), 5);
});

test('Evaluate expression in context using props', t => {

	t.deepEqual(evaluate('number', { number: 5 }), 5);
	t.deepEqual(evaluate('a.b', { a: {b: 'c'} }), 'c');
	t.deepEqual(evaluate('"Hi " + name', { name: 'Jerry' }), 'Hi Jerry');
});

