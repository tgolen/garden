/**
 * general purpose formatters
 *
 * @author Tim Golen 2014-02-12
 */
define(['rivets'], function(rivets) {
	/**
	 * casts a value to a number
	 *
	 * @author Tim Golen 2013-10-22
	 *
	 * @param  {mixed} value
	 *
	 * @return {number}
	 */
	rivets.formatters.number = function (value) {
		return +value;
	};

	/**
	 * subtract values
	 *
	 * @author Tim Golen 2014-02-10
	 *
	 * @param  {integer} val1
	 * @param  {integer} val2
	 *
	 * @return {integer}
	 */
	rivets.formatters.minus = function(val1, val2) {
		return parseInt(val1, 10) - parseInt(val2, 10);
	};

	/**
	 * returns the ith item of an array of items
	 *
	 * @author Tim Golen 2014-02-10
	 *
	 * @param  {Array} arr
	 * @param  {String} i index of the item to get
	 *
	 * @return {mixed}
	 */
	rivets.formatters.at = function(arr, i) {
		if (!_.isArray(arr)) {
			return null;
		}
		return arr[parseInt(i, 10)];
	};

	/**
	 * returns the length of an array
	 *
	 * @author Tim Golen 2014-02-10
	 *
	 * @param  {Array} array
	 *
	 * @return {integer}
	 */
	rivets.formatters.length = function (array) {
		if (!array) {
			return 0;
		}
		return array.length;
	};

	/**
	 * formats the number like a big number eg. 24k
	 *
	 * @author Tim Golen 2013-11-27
	 *
	 * @param  {number} value
	 *
	 * @return {string}
	 */
	rivets.formatters.bignumber = function(value) {
		return formatter.formatBigNumber(value);
	};

	/**
	 * formats a number with commas and such
	 *
	 * @author Tim Golen 2013-11-27
	 *
	 * @param  {number} value
	 *
	 * @return {string}
	 */
	rivets.formatters.formattednumber = function(value) {
		return formatter.formatNumber(value);
	};

	/**
	 * formats a number as a pretty display of bytes
	 *
	 * @author Tim Golen 2014-02-12
	 *
	 * @param  {integer} value
	 *
	 * @return {string}
	 */
	rivets.formatters.bytes = function(value) {
		var bytes = parseInt(value, 10);
		var aKB = 1024,
			aMB = aKB * 1024,
			aGB = aMB * 1024,
			aTB = aGB * 1024;
		if (bytes > aTB)
			return _addDecimalToSingleDigit(bytes / aTB) + ' TB';
		if (bytes > aGB)
			return _addDecimalToSingleDigit(bytes / aGB) + ' GB';
		if (bytes > aMB)
			return _addDecimalToSingleDigit(bytes / aMB) + ' MB';
		if (bytes > aKB)
			return _addDecimalToSingleDigit(bytes / aKB) + ' KB';
		return (bytes | 0) + ' B';
	};

	function _addDecimalToSingleDigit(num){
		var ret = num | 0;
		var split = num.toFixed(1).split('.');
		if (Math.abs(ret) < 10 && split.length > 1 && split[1] != '0')
		{
			return ret + '.' + split[1];
		}
		return ret;
	}

	/**
	 * checks if a value is greater than a number
	 *
	 * @author Tim Golen 2013-11-11
	 *
	 * @param  {number} value
	 * @param  {number} num
	 *
	 * @return {boolean}
	 */
	rivets.formatters.gt = function(value, num) {
		return value > num;
	}

	/**
	 * casts a value to a boolean
	 *
	 * @author Tim Golen 2013-11-02
	 *
	 * @param  {mixed} value
	 */
	rivets.formatters.boolean = function (value) {
		if (value == false || value == 'false' || value == 0) {
			return false;
		}
		return value == true || value == 'true' || value;
	};

	/**
	 * tests if two values are equal
	 * example usage:
	 * rv-hide="rows.length | number | eq 0"
	 *
	 * @author Tim Golen 2013-10-22
	 *
	 * @param  {mixed} value
	 * @param  {string} args
	 *
	 * @return {boolean}
	 */
	rivets.formatters.eq = function(value, args) {
		if (value === true && args === 'true') {
			return true;
		}
		if (value === false && args === 'false') {
			return true;
		}
		return value === args;
	};
	/**
	 * tests if two values are not equal
	 * example usage:
	 * rv-show="rows.length | number | neq 0"
	 *
	 * @author Tim Golen 2013-10-22
	 *
	 * @param  {mixed} value
	 * @param  {string} args
	 *
	 * @return {boolean}
	 */
	rivets.formatters.neq = function(value, args) {
		return value !== args;
	};

	/**
	 * returns true or false if the value exists
	 * in a comma separated string
	 *
	 * @author Tim Golen 2014-01-29
	 *
	 * @param  {string} value
	 * @param  {string} commaString
	 *
	 * @return {boolean}
	 */
	rivets.formatters.in = function(value, commaString) {
		var array = commaString.split(',');
		return array.indexOf(value) > -1;
	}

	/**
	 * returns true or false if the value is blank
	 * or doesn't exist
	 *
	 * @author Tim Golen 2014-01-29
	 *
	 * @param  {mixed} value
	 *
	 * @return {boolean}
	 */
	rivets.formatters.isblank = function(value) {
		if (!value) {
			return true;
		}
		return value === '';
	};

	/**
	 * returns a formatted date
	 *
	 * @author Tim Golen 2013-10-23
	 *
	 * @param  {mixed} value
	 * @param  {string} format of the date
	 *
	 * @return {string}
	 */
	rivets.formatters.date = function(value, format) {
		if (!value) {
			return '---';
		}
		return __m.utc(value.toString()).format( (format) ? format : 'lll' );
	};

	/**
	 * converts some date formats
	 *
	 * @author Tim Golen 2014-01-18
	 *
	 * @param  {string} value in the format of YYYYWW
	 *
	 * @return {string} example: 'Week of Dec 13 2014'
	 */
	rivets.formatters.weekToDate = function(value) {
		var now = __m.utc(value, 'YYYYWW');
		return 'Week of '+now.format('ll');
	};

	/**
	 * converts an array into a comma separated list
	 *
	 * @author Tim Golen 2014-01-18
	 *
	 * @param  {string} value that will be converted to an array
	 *
	 * @return {string}
	 */
	rivets.formatters.comma = function(value) {
		return value.join(',');
	}

	/**
	 * tacks some json, and returns a formatted string
	 *
	 * @author Tim Golen 2013-11-07
	 *
	 * @param  {object} obj
	 *
	 * @return {string}
	 */
	rivets.formatters.json = function(obj) {
		if (_.isString(obj) && _.startsWith(obj, '{') && _.endsWith(obj, '}')) {
			return JSON.stringify(JSON.parse(obj), null, 2);
		}
		return JSON.stringify(obj, null, 2);
	};
	/**
	 * removes certain fields from an acs log params object
	 *
	 * @author Tim Golen 2013-11-04
	 *
	 * @param  {object} obj the params attribute of an acs log
	 * @param  {string} separator what to do the join with
	 * @param  {string} addSpace between the items if === "true"
	 *
	 * @return {object}
	 */
	rivets.formatters.separatedList = function(array, separator, addSpace) {
		if (_.isArray(array) && !_.isEmpty(array)) {
			return (addSpace === 'true') ? array.join(separator + ' ') : array.join(separator);
		}
		return '---';
	};
	/**
	 * when used with the HTML formatter, this will
	 * display a physical space for a blank value
	 *
	 * @author Tim Golen 2013-11-07
	 *
	 * @param  {mixed} value
	 *
	 * @return {mixed}
	 */
	rivets.formatters.showBlankSpace = function(value) {
		return (value)? value: '&nbsp;';
	};
	/**
	 * shows dashes instead of a blank field
	 *
	 * @author Tim Golen 2013-11-11
	 *
	 * @param  {mixed} value
	 *
	 * @return {mixed}
	 */
	rivets.formatters.showBlankDashes = function(value) {
		return (value)? value: '---';
	};
	/**
	 * it's just like showBlankSpace except the non-html version
	 *
	 * @author Tim Golen 2013-11-07
	 *
	 * @param  {mixed} value
	 *
	 * @return {mixed}
	 */
	rivets.formatters.empty = function(value) {
		return (value)? value: '';
	};
	/**
	 * checks to see if the object is empty or not
	 *
	 * @author Tim Golen 2014-02-13
	 *
	 * @param  {object} object
	 *
	 * @return {boolean}
	 */
	rivets.formatters.notempty = function(object) {
		return !_.isEmpty(object);
	};
	/**
	 * formats an array as a list
	 *
	 * @author Tim Golen 2013-11-11
	 *
	 * @param  {array} array
	 *
	 * @return {string}
	 */
	rivets.formatters.list = function(array) {
		var result = '<ul>';
		_.each(array, function(item) {
			result+= '<li>'+item+'</li>';
		});
		result += '</ul>'
		return result;
	};
	/**
	 * formats an array as a linked list
	 *
	 * @author Tim Golen 2013-11-11
	 *
	 * @param  {array} array
	 *
	 * @return {string}
	 */
	rivets.formatters.linklist = function(array, urlPattern) {
		var result = '<ul>';
		_.each(array, function(item) {
			result+= '<li><a href="'+_.sprintf(urlPattern, item)+'">'+item+'</a></li>';
		});
		result += '</ul>'
		return result;
	};
	/**
	 * allows for string substitution
	 *
	 * @author Tim Golen 2013-11-12
	 *
	 * @param  {string} val
	 * @param  {string} urlPattern
	 *
	 * @return {string}
	 */
	rivets.formatters.sprintf = function(val, pattern) {
		return _.sprintf(pattern, val);
	};

	/**
	 * truncats a string to a certain length
	 *
	 * @author Tim Golen 2014-02-12
	 *
	 * @param  {string} val to truncate
	 * @param  {integer} length of string before truncating
	 * @param  {string} truncateString the string to truncate with
	 * @param  {string} addSpecial a special truncate text for ACS
	 *
	 * @return {string}
	 */
	rivets.formatters.truncate = function(val, length, truncateString, addSpecial) {
		return _.truncate(val, parseInt(length, 10), (addSpecial)? '... Click for full text.': truncateString || '...');
	};

	/**
	 * returns the minimum value of two numbers
	 *
	 * example usage:
	 * rv-percentwidth="event.percentage | number | min 5"
	 *
	 * @author Tim Golen 2013-11-26
	 *
	 * @param  {number} val from our model
	 * @param  {string} min argument passed to formatter
	 *                      the absolute minimum
	 *
	 * @return {number}
	 */
	rivets.formatters.min = function(val, min) {
		return Math.max(val, +min);
	};

	/**
	 * returns an escaped string that is safe to display
	 *
	 * @author Tim Golen 2013-12-04
	 *
	 * @param  {string} val
	 *
	 * @return {string}
	 */
	rivets.formatters.escape = function(val) {
		return _.escape(val);
	};
	return rivets;
});