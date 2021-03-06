(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.constantFactory = constantFactory;
	exports.mutationFactory = mutationFactory;
	function constantFactory(initState) {
	  var obj = {};
	  var keys = Object.keys(initState);
	  keys.forEach(function (key) {
	    var value = initState[key];
	    var methods = ['set'];
	    if (Array.isArray(value)) {
	      methods = ['set', 'add', 'del', 'update'];
	    }
	    methods.forEach(function (met) {
	      var name = met + '_' + key;
	      obj[name] = name;
	    });
	  });
	  return Object.freeze(obj);
	}
	
	function mutationFactory(initState) {
	
	  var types = constantFactory(initState);
	
	  var mutations = {};
	
	  function mutate(prop) {
	    return Object.assign({}, state, prop);
	  }
	
	  //build mutation tree
	  Object.keys(types).forEach(function (typ) {
	
	    var arr = typ.split('_');
	    var method = arr[0];
	    var target = arr[1];
	    var func = void 0;
	    if (method === 'set') {
	      func = function func(state, payload) {
	        state[target] = payload.data;
	      };
	    } else if (method === 'add') {
	      func = function func(state, payload) {
	        state[target] = state[target].slice(0).concat(payload.data);
	      };
	    } else if (method === 'del') {
	      func = function func(state, payload) {
	        var rt = target;
	        var arr0 = state[rt].slice(0);
	        var data = payload.data;
	        var compare = payload.compare;
	        for (var i = 0, len = arr0.length; i < len; i++) {
	          var item = arr0[i];
	          var res = compare ? compare(item, data) : item.id === data.id;
	          if (res) {
	            arr0.splice(i, 1);
	            break;
	          }
	        }
	        state[rt] = arr0;
	      };
	    } else if (method === 'update') {
	      func = function func(state, payload) {
	        var rt = target;
	        var arr0 = state[rt].slice(0);
	        var data = payload.data;
	        var compare = payload.compare;
	        for (var i = 0, len = arr0.length; i < len; i++) {
	          var item = arr0[i];
	          var res = compare ? compare(item, data) : item.id === data.id;
	          if (res) {
	            arr0.splice(i, 1, Object.assign({}, item, data));
	            break;
	          }
	        }
	        state[rt] = arr0;
	      };
	    }
	    mutations[typ] = func;
	  });
	
	  return mutations;
	}

/***/ }
/******/ ])
});
;