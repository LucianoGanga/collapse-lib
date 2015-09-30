/* eslint no-empty: 0 */
'use strict';

// isPlainObject is part of the jQuery source (the method is a little modified)

var CollapseLib = {
	/**
	 * 
	 * @warning allowed types for complexDict : {}, [], JS primitives (int, float, or string)
	 *
	 * @param complexDict : a JS object that might have inner JS objects and arrays OR
	 *                      a JS array that might have inner JS objects and arrays OR
	 * @param plainDict   : a one-level collapse JS object
	 */

	// if you have an empty object, just return an empty object
	collapseDict: function(complexDict) {
		// make plain object to return
		var plainDict = {},
			sawComplex = false,
			subDict;

		if (CollapseLib.isPlainObject(complexDict)) {
			// if complexDict is a JS object
			sawComplex = false;
			for (var complexKey in complexDict) {
				// if complexDict[complexKey] is an inner dict
				if (CollapseLib.isPlainObject(complexDict[complexKey])) {
					if (CollapseLib.isEmptyObject(complexDict[complexKey])) {
						return complexDict;
					}

					subDict = complexDict[complexKey];
					sawComplex = true;
					for (var subKey in subDict) {
						plainDict[complexKey + '.' + subKey] = CollapseLib.collapseDict(subDict[subKey]);
					}
				} else if (Array.isArray && Array.isArray(complexDict[complexKey])) {
					if (!CollapseLib.isComplexArray(complexDict[complexKey])) {
						plainDict[complexKey] = CollapseLib.getStrFromArray(complexDict[complexKey]);
					} else {
						sawComplex = true;
						for (var i = 0; i < complexDict[complexKey].length; i++) {
							plainDict[complexKey + '[' + i + ']'] = CollapseLib.collapseDict(complexDict[complexKey][i]);
						}
					}
				} else {
					plainDict[complexKey] = CollapseLib.collapseDict(complexDict[complexKey]);
				}
			}
			if (sawComplex) {
				return CollapseLib.collapseDict(plainDict);
			} else {
				return plainDict;
			}
		} else {
			if (Array.isArray && Array.isArray(complexDict)) {
				plainDict = {};

				// if complexDict is an array
				// that contains an inner array or inner plain object
				if (CollapseLib.isComplexArray(complexDict)) {
					for (var i = 0; i < complexDict.length; i++) {
						plainDict['[' + i + ']'] = CollapseLib.collapseDict(complexDict[i]);
					}
				}
				return CollapseLib.collapseDict(plainDict);
			} else {
				return complexDict.toString();
			}
		}
	}

	,
	isComplexArray: function(arr) {
		for (var i = 0; i < arr.length; i++) {
			if ((Array.isArray && Array.isArray(arr[i])) || CollapseLib.isPlainObject(arr[i])) {
				return true;
			}
		}
		return false;
	}

	,
	getStrFromArray: function(arr) {
		return arr.toString();
	}

	,
	isPlainObject: function(obj) {
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

	,
	isEmptyObject: function(obj) {
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				return false;
			}
		}
		return true;
	}
};
