/* eslint no-empty: 0 */
'use strict';

// isPlainObject is part of the jQuery source (the method is a little modified)

/**
 * 
 * @warning allowed types for complexObj : {}, [], JS primitives (int, float, or string)
 *
 * @param complexObj : a JS object that might have inner JS objects and arrays OR
 *                      a JS array that might have inner JS objects and arrays OR
 * @param plainObj   : a one-level collapse JS object
 */

// if you have an empty object, just return an empty object
function collapseObj(complexObj, stringifyArray) {
	// make plain object to return
	var plainObj = {},
		sawComplex = false,
		subObj;

	if (isPlainObject(complexObj)) {
		// if complexObj is a JS object
		sawComplex = false;
		for (var complexKey in complexObj) {
			// if complexObj[complexKey] is an inner obj
			if (isPlainObject(complexObj[complexKey])) {
				if (isEmptyObject(complexObj[complexKey])) {
					return complexObj;
				}

				subObj = complexObj[complexKey];
				sawComplex = true;
				for (var subKey in subObj) {
					plainObj[complexKey + '.' + subKey] = collapseObj(subObj[subKey]);
				}
			} else if (Array.isArray && Array.isArray(complexObj[complexKey])) {
				if (!isComplexArray(complexObj[complexKey])) {
					if (stringifyArray) {
						plainObj[complexKey] = getStrFromArray(complexObj[complexKey]);
					} else {
						plainObj[complexKey] = complexObj[complexKey];
					}

				} else {
					sawComplex = true;
					for (var i = 0; i < complexObj[complexKey].length; i++) {
						plainObj[complexKey + '[' + i + ']'] = collapseObj(complexObj[complexKey][i]);
					}
				}
			} else {
				plainObj[complexKey] = collapseObj(complexObj[complexKey]);
			}
		}
		if (sawComplex) {
			return collapseObj(plainObj);
		} else {
			return plainObj;
		}
	} else {
		if (Array.isArray && Array.isArray(complexObj)) {
			plainObj = {};

			// if complexObj is an array
			// that contains an inner array or inner plain object
			if (isComplexArray(complexObj)) {
				for (var j = 0; j < complexObj.length; j++) {
					plainObj['[' + j + ']'] = collapseObj(complexObj[j]);
				}
			}
			return collapseObj(plainObj);
		} else {
			return complexObj.toString();
		}
	}
}

function isComplexArray(arr) {
	for (var i = 0; i < arr.length; i++) {
		if ((Array.isArray && Array.isArray(arr[i])) || isPlainObject(arr[i])) {
			return true;
		}
	}
	return false;
}

function getStrFromArray(arr) {
	return arr.toString();
}

function isPlainObject(obj) {
	var hasOwn = Object.prototype.hasOwnProperty;
	// Must be an Object.
	// Because of IE, we also have to check the presence of the constructor property.
	// Make sure that DOM nodes and window objects don't pass through, as well
	if (!obj || typeof obj !== 'object' || obj.nodeType) {
		return false;
	}

	try {
		// Not own constructor property must be Object
		if (obj.constructor &&
			!hasOwn.call(obj, 'constructor') &&
			!hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
			return false;
		}
	} catch (e) {
		// IE8,9 Will throw exceptions on certain host objects #9897
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) {}

	return key === undefined || hasOwn.call(obj, key);
}

function isEmptyObject(obj) {
	for (var i in obj) {
		if (obj.hasOwnProperty(i)) {
			return false;
		}
	}
	return true;
}

/**
 * Public methods exported
 */
module.exports = {
	collapseObj: collapseObj,
	isComplexArray: isComplexArray,
	getStrFromArray: getStrFromArray,
	isPlainObject: isPlainObject,
	isEmptyObject: isEmptyObject
};
