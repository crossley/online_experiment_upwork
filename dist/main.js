/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/classes/Game.js":
/*!*****************************!*\
  !*** ./src/classes/Game.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Game; });\n/* harmony import */ var _StateMachine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StateMachine */ \"./src/classes/StateMachine.js\");\n\r\n\r\nclass Game {\r\n  constructor(){\r\n    this.states = {\r\n      \"loading\": state_loading,\r\n      \"fixation\": state_fixation,\r\n      \"trial\": state_trial,\r\n      \"results\": state_results,\r\n      \"finish\": state_finish\r\n    };\r\n    this.stateMachine = new _StateMachine__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n\r\n    this.curStateKey = null;\r\n    this.curState = null;\r\n  }\r\n\r\n  setState(newStateKey){\r\n\r\n    if(!newStateKey || !this.states[newStateKey]){\r\n      return console.warn(\"cannot set state - \" + newStateKey);\r\n    }\r\n\r\n    const newState = this.states[state];\r\n    const prevStateKey = this.curStateKey;\r\n    let prevState;\r\n    if(prevStateKey !== null){\r\n      prevState = this.states[prevStateKey];\r\n    } else {\r\n      prevState = null;\r\n    }\r\n\r\n    if(prevState) {\r\n      // transitioning from current state \r\n      if(this.stateMachine.transitions[prevStateKey][newStateKey]){\r\n        // if a special transition function is defined, we use that\r\n        this.stateMachine.transitions[prevStateKey][newStateKey].call(this);\r\n      } else {\r\n        prevState.terminate()\r\n          .then(newState.init())\r\n      }\r\n    } else {\r\n\r\n    }\r\n    this.curStateKey = state;\r\n    this.curState = this.states[this.curStateKey];\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/classes/Game.js?");

/***/ }),

/***/ "./src/classes/StateMachine.js":
/*!*************************************!*\
  !*** ./src/classes/StateMachine.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return StateMachine; });\nclass StateMachine {\r\n  constructor(){\r\n    this.transitions = [];\r\n  }\r\n\r\n  defineTransition(state1, state2, transition){\r\n    if(this.transitions[state1]){\r\n      this.transitions[state1] = [];\r\n    }\r\n\r\n    this.transitions[state1][state2] = transition;\r\n  }\r\n};\n\n//# sourceURL=webpack:///./src/classes/StateMachine.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/Game */ \"./src/classes/Game.js\");\n\r\n\r\nwindow.game = new _classes_Game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });