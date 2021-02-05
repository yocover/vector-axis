(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.Axis = factory());
}(this, (function () { 'use strict';

	/**
	 * @author yocover / https://github.com/yocover
	 */

	var Axis = function () {};

	return Axis;

})));
