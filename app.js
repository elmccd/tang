import { evaluate } from './lib/evaluate';

const textRegexp = /{{([^{}]*)}}/gi;

var clone = require('clone');
var parseTextNode = (textValue = '', context = {}) => {

	return textValue
		.replace(textRegexp, (match, capture) => evaluate(capture, context));
};


var parse5 = require('parse5');

var clearParentNodes = el => {
	if (el.parentNode) {
		delete el.parentNode;
	}

	if (el.childNodes) {
		el.childNodes.forEach(child => {
			clearParentNodes(child);
		});
	}
};

var clearNode = (el) => {

	for (let member in el) {
		delete el[member];
	}

	el.nodeName = '#text';
	el.value = '';
};

var parseNodeAttrs = (el, context) => {

	for (let i = 0; i < el.attrs.length; i += 1) {

		let attr = el.attrs[i];

		if (attr.name.startsWith(':')) {

			let value = evaluate(attr.value, context);

			if (attr.name === ':if') {
				if (!value) {
					clearNode(el);
					return true;
				}
			} else if (attr.name === ':bind') {
					el.childNodes = [{
								"nodeName": "#text",
								"value": value
						}];
			} else {
				if (value === true) {
					 attr.name = attr.name.substr(1);
					 attr.value = attr.name;
				} else if (value === false || value === '') {

				} else {
					 attr.name = attr.name.substr(1);
					 attr.value = value.toString();
				}
			}

		} else {

			attr.value = parseTextNode(attr.value, context);
		}

	}

	el.attrs = el.attrs ? el.attrs.filter(el => el && !el.name.startsWith(':')) : el.attrs;

	return true;
};

var parse = (el, context) => {

	if (el.nodeName === '#text') {

		el.value = parseTextNode(el.value, context);
	}

	if (el.attrs && !parseNodeAttrs(el, context)) {

		clearNode(el);
	}
};

var process = (el, context) => {

	parse(el, context);

	if (el && el.childNodes) {
		el.childNodes.forEach(child => {
			process(child, context);
		});
	}
};

export const teng = function teng(templateString) {

	var fragment = parse5.parseFragment(templateString);

	clearParentNodes(fragment);

	return data => {
		var template = clone(fragment);

		process(template, data);

		return parse5.serialize(template);
	}
};
