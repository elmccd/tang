
export const parseContext = context => {

	return Object.keys(context)
		.map(prop => `var ${prop} = this["${prop}"];`)
		.join('');
};

const evalInContext = function (expression) {

	return eval(`${parseContext(this)}  ${expression}`);
};

/**
 * Evaluate in context
 *
 * @param {String} expression
 * @param {Object} context
 *
 * @returns {*}
 */
export const evaluate = (expression, context = {}) => {

	try {
		return evalInContext.call(context, expression);
	} catch (err) {
		return err;
	}

};
