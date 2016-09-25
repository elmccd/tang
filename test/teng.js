import test from 'ava';
import { teng } from '../app';

test('js expressions', t => {

	t.is(teng('')({}), '');
	t.is(teng('regular text')({}), 'regular text');
	t.is(teng('{{ 2+3 }}')({}), '5');
	t.is(teng('{{"Multiple"}} expressions {{ 2+3 }}')({}), 'Multiple expressions 5');
});


test(':if', t => {

	t.is(teng('<span :if="true">Content</span>')({}), '<span>Content</span>');
	t.is(teng('<span :if="1">Content</span>')({}), '<span>Content</span>');

	t.is(teng('<span :if="false">Content</span>')({}), '');
	t.is(teng('<span :if="0">Content</span>')({}), '');
	t.is(teng('<span :if="">Content</span>')({}), '');
	t.is(teng('<span :if>Content</span>')({}), '');

});

test(':if complex expression', t => {

	t.is(teng('<span :if="4 === 2 + 2">Content</span>')({}), '<span>Content</span>');
});

test(':if Empty content', t => {

	t.is(teng('<span :if="">Content</span>')({}), '');
});

test(':bind', t => {

	t.is(teng(`<span :bind="'Content'"></span>`)({}), '<span>Content</span>');
});

test('multiple attr', t => {

	t.is(teng(`<span :bind="'Content'" :if="true"></span>`)({}), '<span>Content</span>');
	t.is(teng(`<span :bind="'Content'" :if="false"></span>`)({}), '');
	t.is(teng(`<span :bind="" :if="true"></span>`)({}), '<span></span>');
	t.is(teng(`<span :bind :if="true"></span>`)({}), '<span></span>');
});


test('parsing custom attrs expressions', t => {

	t.is(teng(`<span data-id="{{id}}"></span>`)({ id: 3 }), '<span data-id="3"></span>');
	t.is(teng(`<span class="{{active ? 'active' : ''}}"></span>`)({ active: true }), '<span class="active"></span>');
});


test('parsing custom attrs', t => {

	t.is(teng(`<span :data-id="id"></span>`)({ id: 3 }), '<span data-id="3"></span>');
	t.is(teng(`<span :class="active ? 'active' : ''"></span>`)({ active: true }), '<span class="active"></span>');

	t.is(teng(`<input :disabled="true">`)(), '<input disabled="disabled">');
});
