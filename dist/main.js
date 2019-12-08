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

/***/ "./config/parameters_config.json":
/*!***************************************!*\
  !*** ./config/parameters_config.json ***!
  \***************************************/
/*! exports provided: background_color, mouse_color, mouse_size, fixation_point_position, fixation_point_duration, fixation_point_tolerance, fixation_point_guide_radius, square_outline_color, action_keys, delay_before_feedback, mouse_position_capture_rate, stimuli_position_coordinate_space, trials_per_session, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"background_color\\\":\\\"#FFFFFF\\\",\\\"mouse_color\\\":\\\"#FF0000\\\",\\\"mouse_size\\\":\\\"20\\\",\\\"fixation_point_position\\\":[0.5,0.5],\\\"fixation_point_duration\\\":1000,\\\"fixation_point_tolerance\\\":20,\\\"fixation_point_guide_radius\\\":50,\\\"square_outline_color\\\":\\\"#FFA62B\\\",\\\"action_keys\\\":[\\\"f\\\",\\\"j\\\"],\\\"delay_before_feedback\\\":500,\\\"mouse_position_capture_rate\\\":\\\"15\\\",\\\"stimuli_position_coordinate_space\\\":[0,1],\\\"trials_per_session\\\":5}\");\n\n//# sourceURL=webpack:///./config/parameters_config.json?");

/***/ }),

/***/ "./src/classes/Game.js":
/*!*****************************!*\
  !*** ./src/classes/Game.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Game; });\n/* harmony import */ var _StateMachine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StateMachine */ \"./src/classes/StateMachine.js\");\n/* harmony import */ var _states_state_loading__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../states/state_loading */ \"./src/states/state_loading.js\");\n/* harmony import */ var _states_state_fixation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../states/state_fixation */ \"./src/states/state_fixation.js\");\n/* harmony import */ var _states_state_trial__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../states/state_trial */ \"./src/states/state_trial.js\");\n/* harmony import */ var _states_state_results__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../states/state_results */ \"./src/states/state_results.js\");\n/* harmony import */ var _states_state_finish__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../states/state_finish */ \"./src/states/state_finish.js\");\n/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Loader */ \"./src/classes/Loader.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nclass Game {\r\n  constructor(div){\r\n    this.stateMachine = new _StateMachine__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this);\r\n    this.loader = new _Loader__WEBPACK_IMPORTED_MODULE_6__[\"default\"](this);\r\n    this.stage = div || document.documentElement;\r\n    this.stage.objs = [];\r\n\r\n    this.states = {\r\n      \"loading\": _states_state_loading__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\r\n      \"fixation\": _states_state_fixation__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\r\n      \"trial\": _states_state_trial__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\r\n      \"results\": _states_state_results__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\r\n      \"finish\": _states_state_finish__WEBPACK_IMPORTED_MODULE_5__[\"default\"]\r\n    };\r\n    for(let state in this.states){\r\n      this.states[state].game = this;\r\n    }\r\n\r\n    this.curStateKey = null;\r\n    this.curState = null;\r\n\r\n    this.mouseX = 0;\r\n    this.mouseY = 0;\r\n    this.stage.addEventListener('mousemove', this.onMouseMove.bind(this));\r\n\r\n    this.lastTime = Date.now();\r\n    this.deltaTime = 0;\r\n    this.resizeHandle();\r\n    window.requestAnimationFrame(() => this.tick());\r\n  }\r\n\r\n  onMouseMove(e){\r\n    this.mouseX = e.clientX;\r\n    this.mouseY = e.clientY;\r\n  }\r\n\r\n  tick(){\r\n    const timeNow = Date.now();\r\n    this.deltaTime = timeNow - this.lastTime;\r\n    this.lastTime = timeNow;\r\n\r\n    if(this.curState && this.curState.update){\r\n      this.curState.update();\r\n    }\r\n\r\n    window.requestAnimationFrame(() => this.tick());\r\n  }\r\n\r\n  resizeHandle(){\r\n    this.stage.style.width = window.innerWidth.toString() + \"px\";\r\n    this.stage.style.height = window.innerHeight.toString() + \"px\";\r\n    if(this.curState && this.curState.reposition){\r\n      this.curState.reposition();\r\n    }\r\n  }\r\n\r\n  setState(newStateKey){\r\n    if(!newStateKey || !this.states[newStateKey]){\r\n      return console.warn(\"cannot set state - \" + newStateKey);\r\n    }\r\n\r\n    const newState = this.states[newStateKey];\r\n    const prevStateKey = this.curStateKey;\r\n    let prevState;\r\n    if(prevStateKey !== null){\r\n      prevState = this.states[prevStateKey];\r\n    } else {\r\n      prevState = null;\r\n    }\r\n\r\n    if(prevState) {\r\n      // transitioning from current state \r\n      if(this.stateMachine.transitions[prevStateKey] && \r\n        this.stateMachine.transitions[prevStateKey][newStateKey]){\r\n        // if a special transition function is defined, we use that\r\n        this.stateMachine.transitions[prevStateKey][newStateKey].call(this);\r\n      } else {\r\n        prevState.terminate()\r\n        newState.init();\r\n      }\r\n    } else {\r\n      newState.init();\r\n    }\r\n    this.curStateKey = newStateKey;\r\n    this.curState = this.states[this.curStateKey];\r\n  }\r\n\r\n  addImage(x, y, key){\r\n    let img;\r\n    if(!this.stage.objs[key]){\r\n      img = this.stage.appendChild(this.loader.cache[key]);\r\n      this.stage.objs[key] = img;\r\n    } else {\r\n      img = this.stage.objs[key].cloneNode();\r\n      this.stage.appendChild(img);\r\n    }\r\n    img.key = key;\r\n    img.style.position = \"absolute\";\r\n    img.style.left = x.toString() + \"px\";\r\n    img.style.top = y.toString() + \"px\";\r\n    this.stage.appendChild(img);\r\n\r\n    return img;\r\n  }\r\n\r\n  addLabel(x = 0, y = 0, text = \"\", fontSize = 18){\r\n    const lbl = document.createElement('p');\r\n    lbl.innerText = text;\r\n    lbl.style.position = \"absolute\";\r\n    lbl.style.left = x.toString() + \"px\";\r\n    lbl.style.top = y.toString() + \"px\";\r\n    lbl.style.fontSize = fontSize.toString() + \"px\";\r\n    this.stage.appendChild(lbl);\r\n\r\n    return lbl;\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack:///./src/classes/Game.js?");

/***/ }),

/***/ "./src/classes/Loader.js":
/*!*******************************!*\
  !*** ./src/classes/Loader.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Loader; });\nclass Loader {\r\n  constructor(game){\r\n    this.game = game;\r\n\r\n    this.loadingQueue = [];\r\n    this.cache = {};\r\n  }\r\n\r\n  clearLoadingQueue(){\r\n    this.loadingQueue = [];\r\n    this.onFinish = () => {};\r\n  }\r\n\r\n  clearCache(){\r\n    this.cache = {};\r\n  }\r\n\r\n  addImage(key, src){\r\n    this.loadingQueue.push({type: \"image\", key: key, src: src});\r\n  }\r\n\r\n  start(){\r\n    console.log(\"loader start\");\r\n    this.loadingTarget = this.loadingQueue.length;\r\n    this.progress = 0;\r\n    this.proceedLoadingQueue();\r\n  }\r\n\r\n  onFinish(){\r\n\r\n  }\r\n\r\n  proceedLoadingQueue(){\r\n    this.progress = 1 - (this.loadingQueue.length / this.loadingTarget);\r\n    if(this.loadingQueue.length <=0) return this.onFinish();\r\n\r\n    const next = this.loadingQueue.pop();\r\n    switch(next.type){\r\n      case \"image\":\r\n      const img = new Image();\r\n      img.src = next.src;\r\n      this.cache[next.key] = img;\r\n      img.addEventListener('load', () => this.proceedLoadingQueue());\r\n      break;\r\n\r\n      default: \r\n      this.proceedLoadingQueue();\r\n      break;\r\n    }\r\n  }\r\n}\n\n//# sourceURL=webpack:///./src/classes/Loader.js?");

/***/ }),

/***/ "./src/classes/State.js":
/*!******************************!*\
  !*** ./src/classes/State.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return State; });\nclass State {\r\n  constructor(){\r\n\r\n  }\r\n\r\n  init(){\r\n    this.objs = [];\r\n    this.create();\r\n  }\r\n\r\n  create(){\r\n\r\n  }\r\n\r\n  update(){\r\n\r\n  }\r\n\r\n  terminate(){\r\n    for(let obj of this.objs){\r\n      obj.remove();\r\n      if(obj.key) {\r\n        this.stage.objs[obj.key] = null;\r\n      }\r\n    }\r\n  }\r\n\r\n}\n\n//# sourceURL=webpack:///./src/classes/State.js?");

/***/ }),

/***/ "./src/classes/StateMachine.js":
/*!*************************************!*\
  !*** ./src/classes/StateMachine.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return StateMachine; });\nclass StateMachine {\r\n  constructor(game){\r\n    this.game = game;\r\n    this.transitions = [];\r\n  }\r\n\r\n  defineTransition(state1, state2, transition){\r\n    if(this.transitions[state1]){\r\n      this.transitions[state1] = [];\r\n    }\r\n\r\n    this.transitions[state1][state2] = transition;\r\n  }\r\n};\n\n//# sourceURL=webpack:///./src/classes/StateMachine.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/Game */ \"./src/classes/Game.js\");\n\r\n\r\nconst gameDiv = document.getElementById(\"gameDiv\");\r\nwindow.game = new _classes_Game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](gameDiv);\r\nwindow.game.setState(\"loading\");\r\nwindow.addEventListener('resize', () => window.game.resizeHandle());\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/states/state_finish.js":
/*!************************************!*\
  !*** ./src/states/state_finish.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_State__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/State */ \"./src/classes/State.js\");\n\r\n\r\nconst state_finish = new _classes_State__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (state_finish);\n\n//# sourceURL=webpack:///./src/states/state_finish.js?");

/***/ }),

/***/ "./src/states/state_fixation.js":
/*!**************************************!*\
  !*** ./src/states/state_fixation.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_State__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/State */ \"./src/classes/State.js\");\n/* harmony import */ var _config_parameters_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config/parameters_config */ \"./config/parameters_config.json\");\nvar _config_parameters_config__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../config/parameters_config */ \"./config/parameters_config.json\", 1);\n\r\n\r\n\r\nconst state_fixation = new _classes_State__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n\r\nstate_fixation.create = function(){\r\n  this.game.debugLbl.innerText = \"Move mouse to center point\";\r\n\r\n  this.pointTolerance = _config_parameters_config__WEBPACK_IMPORTED_MODULE_1__[\"fixation_point_tolerance\"];\r\n  this.guideRadius = _config_parameters_config__WEBPACK_IMPORTED_MODULE_1__[\"fixation_point_guide_radius\"];\r\n  this.guideDuration = _config_parameters_config__WEBPACK_IMPORTED_MODULE_1__[\"fixation_point_duration\"];\r\n\r\n  this.circle = document.createElement(\"div\");\r\n  this.circle.style.position = \"absolute\";\r\n  this.circle.style.width = (this.guideRadius * 2).toString() + \"px\";\r\n  this.circle.style.height = (this.guideRadius * 2).toString() + \"px\";\r\n  this.circle.className = \"guideCircle\";\r\n\r\n  this.game.stage.appendChild(this.circle);\r\n\r\n  this.reposition();\r\n};\r\n\r\nstate_fixation.reposition = function(){\r\n  this.circle.style.left = (window.innerWidth/2 - this.circle.offsetWidth/2).toString() + \"px\";\r\n  this.circle.style.top = (window.innerHeight/2 - this.circle.offsetHeight/2).toString() + \"px\";\r\n\r\n  this.game.debugLbl.style.left = (window.innerWidth/2 - this.game.debugLbl.offsetWidth / 2).toString() + \"px\";\r\n};\r\n\r\nstate_fixation.update = function(){\r\n  const mouseX = this.game.mouseX / window.innerWidth;\r\n  const mouseY = this.game.mouseY / window.innerHeight;\r\n  const radTolX = this.pointTolerance / window.innerWidth;\r\n  const radTolY = this.pointTolerance / window.innerHeight;\r\n\r\n  if(Math.abs(mouseX - _config_parameters_config__WEBPACK_IMPORTED_MODULE_1__[\"fixation_point_position\"][0]) < radTolX\r\n  && Math.abs(mouseY - _config_parameters_config__WEBPACK_IMPORTED_MODULE_1__[\"fixation_point_position\"][1])  < radTolY){\r\n    if(this.curGuideRadius > 0){\r\n      this.curGuideRadius -= this.game.deltaTime / this.guideDuration * this.guideRadius;\r\n      if(this.curGuideRadius < 0)this.curGuideRadius = 0;\r\n    } else { \r\n      this.game.setState(\"trial\");\r\n    }\r\n    let circX = (window.innerWidth/2 - this.circle.offsetWidth/2) * ((this.curGuideRadius / this.guideRadius)) +  (this.game.mouseX - this.curGuideRadius) * (1 - this.curGuideRadius / this.guideRadius);\r\n    let circY = (window.innerHeight/2 - this.circle.offsetHeight/2) * ((this.curGuideRadius / this.guideRadius)) +  (this.game.mouseY - this.curGuideRadius) * (1 - this.curGuideRadius / this.guideRadius);\r\n    this.circle.style.left = circX.toString() + \"px\";\r\n    this.circle.style.top =  circY.toString() + \"px\";\r\n  } else {\r\n    this.curGuideRadius = this.guideRadius;\r\n    this.circle.style.left = (window.innerWidth/2 - this.curGuideRadius).toString() + \"px\";\r\n    this.circle.style.top = (window.innerHeight/2 - this.curGuideRadius).toString() + \"px\";\r\n  }\r\n  \r\n  this.circle.style.width = (this.curGuideRadius * 2).toString() + \"px\";\r\n  this.circle.style.height = (this.curGuideRadius * 2).toString() + \"px\";\r\n};\r\n\r\nstate_fixation.terminate = function(){\r\n  this.circle.remove();\r\n};\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (state_fixation);\n\n//# sourceURL=webpack:///./src/states/state_fixation.js?");

/***/ }),

/***/ "./src/states/state_loading.js":
/*!*************************************!*\
  !*** ./src/states/state_loading.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_State__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/State */ \"./src/classes/State.js\");\n\r\n\r\nconst state_loading = new _classes_State__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n\r\nstate_loading.create = function(){\r\n  \r\n  this.game.loader.addImage(\"0\", \"../img/0.png\");\r\n  this.game.loader.addImage(\"1\", \"../img/1.png\");\r\n  this.game.loader.addImage(\"2\", \"../img/2.png\");\r\n\r\n  this.game.loader.start();\r\n  this.game.loader.onFinish = this.onLoadFinish;\r\n\r\n  this.game.debugLbl = this.game.addLabel(window.innerWidth/2, 50, \"loading\");\r\n};\r\n\r\nstate_loading.update = function(){\r\n};\r\n\r\nstate_loading.onLoadFinish = function(){\r\n  this.game.setState(\"fixation\");\r\n};\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (state_loading);\n\n//# sourceURL=webpack:///./src/states/state_loading.js?");

/***/ }),

/***/ "./src/states/state_results.js":
/*!*************************************!*\
  !*** ./src/states/state_results.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_State__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/State */ \"./src/classes/State.js\");\n\r\n\r\nconst state_results = new _classes_State__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (state_results);\n\n//# sourceURL=webpack:///./src/states/state_results.js?");

/***/ }),

/***/ "./src/states/state_trial.js":
/*!***********************************!*\
  !*** ./src/states/state_trial.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_State__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/State */ \"./src/classes/State.js\");\n\r\n\r\nconst state_trial = new _classes_State__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n\r\nstate_trial.create = function(){\r\n  this.game.debugLbl.innerText = \"Trial began\";\r\n};\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (state_trial);\n\n//# sourceURL=webpack:///./src/states/state_trial.js?");

/***/ })

/******/ });