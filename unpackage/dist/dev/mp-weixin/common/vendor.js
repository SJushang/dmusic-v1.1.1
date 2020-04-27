(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail') || !event.detail) {
    event.detail = {};
  }

  if (!('markerId' in event.detail) && 'markerId' in event) {
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 104:
/*!********************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/common/airport.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "list": [{
    "letter": "A",
    "data": [
    "阿里郎"] },

  {
    "letter": "B",
    "data": [
    "Beyond"] },

  {
    "letter": "C",
    "data": [
    "蔡徐坤"] },

  {
    "letter": "D",
    "data": [
    "邓超"] },

  {
    "letter": "E",
    "data": [
    "EXO"] },

  {
    "letter": "F",
    "data": [
    "缝纫机乐队"] },

  {
    "letter": "G",
    "data": [
    "郭峰"] },

  {
    "letter": "H",
    "data": [
    "黄征"] },

  {
    "letter": "I",
    "data": [
    "iKON"] },

  {
    "letter": "J",
    "data": [
    "贾乃亮"] },

  {
    "letter": "K",
    "data": [
    "筷子兄弟"] },

  {
    "letter": "L",
    "data": [
    "Lady Gaga"] },

  {
    "letter": "M",
    "data": [
    "马健涛"] },

  {
    "letter": "N",
    "data": [
    "南征北战"] },

  {
    "letter": "O",
    "data": [
    "欧得洋"] },

  {
    "letter": "P",
    "data": [
    "庞龙"] },

  {
    "letter": "Q",
    "data": [
    "齐秦"] },

  {
    "letter": "R",
    "data": [
    "任贤齐"] },

  {
    "letter": "S",
    "data": [
    "沙宝亮"] },

  {
    "letter": "T",
    "data": [
    "童安格"] },

  {
    "letter": "U",
    "data": [
    "Uu"] },

  {
    "letter": "V",
    "data": [
    "Vk"] },

  {
    "letter": "W",
    "data": [
    "王菲"] },

  {
    "letter": "X",
    "data": [
    "谢天笑"] },

  {
    "letter": "Y",
    "data": [
    "杨洋"] },

  {
    "letter": "Z",
    "data": [
    "张杰"] },


  {
    "letter": "#",
    "data": [
    "#是我"] }] };

/***/ }),

/***/ 14:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 141:
/*!********************************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/static/defaultMusicAvatar.jpg ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAyADIDASIAAhEBAxEB/8QAHAABAAICAwEAAAAAAAAAAAAAAAcIAwQBAgUG/8QAMhAAAQQBAgMFBgYDAAAAAAAAAQACAwQFERIGITEHQVFhcRMUIlKBkTIzQkRioWOxwf/EABgBAQADAQAAAAAAAAAAAAAAAAABAgUG/8QAHxEAAgICAQUAAAAAAAAAAAAAAAECEQMS8BMhMUFR/9oADAMBAAIRAxEAPwCWURRzx3x+/G2JMRiJA203lPYHP2Z+Vv8ALxPd6oD7y5kqOObuu3a9Yf5pWs/2VgqZ/D337KeVpTv+WOdpP21Va8jZfNI6exK6SV3Mvkducfqea0oJWPcNCCUBbJFCXB/aFcw88dTJzSWccTtJedz4fMHqR5fZTXG9ksbZI3Nex4DmuadQQehCA7IiIDRzOQGJwl7IH9tA+UeoHL+9FV2a9K+SSeZ5fK9xe9x6ucTqT91Zbi6m+/wfmKsQ1kkqP2jxIGv/ABVgkYXxnTvGoQHpVa7XxtlnG97hro7uWeWpBK0gsa13c5o0IWOpO2WuxwPMDQjwKzDbHH10aBqST0WROc922+52eDBg6Kiopxa5z0ea2dzC6N5+Nh0Knfsoyz8lwh7vI7c+jMYRr8hAc0fTUj6KvkkhlsSygaNc7l6KcOxSrJHwzftOHw2LejPPa0A/2VrRulZx+RRU2o+LdEmIiKSg68iNQq+doHB83DWWksQRE4uy8uheByjJ5lh8PLxCsGsVmrBdrSVrULJoJBtfHI3Vrh5hAVKduY8vjeWO8QuN8soAmmc8Du6BTplexvCXJXSULdmgSdfZjSRg9AeY+606XYlj4pQ65mLM7B+iOJsev11KjVXdF1kmo6puvlkV4TA3eIcpFj8fFukf+J2nwxt73OPcArL4PEV8DhauMq/lV2bdx6uPUuPmTqV1w2AxnD9T3bGVGQMPNxHNzz4uJ5lekpKBERAEREAREQBERAEREB//2Q=="

/***/ }),

/***/ 142:
/*!**************************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/static/play_icn_one.png ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKIAAACiCAMAAAD1LOYpAAABoVBMVEX////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////gh21wAAAAi3RSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFpisOszIaRcYmyYZvUoay3wbqjAcxVsdSHSTrrvDjx5TlalWupCas4VeQiwkHyA+fjwhqzNNxnYlIlLKob5OQ54rvCPJblpBX3LBZHiCdaLCal0uUah6eZZUsjhHRsc2UKYqZ0A/wHBcoFmfc0x7O4NolK3EYTUFTwAACq1JREFUeNrt3Pl3G0USAOBIiS07PmRbsoEJ0tqxg0AgsgTEEbKbYDuQBeKQxIAFhrAEmzuE+9wlG2AX+Ku3z+nq7uqe7pmRyeOpfoL3Yvt71cdI01V96NAoRjGKUYxiFKMYxSj+pFFB4s4TeeKOhR2sFP2L1Yw4MGa0LBM6TF01bwwHWSnNhzLvnPS5kQfpO2xHELI0YIwsxFncGARUjCOO8CkLEsN9EDSmB2SWbcwG6rwxd3iRuYmBwEwdVDqQOY1ZQOUzKONmBCBzETOEKdBns5USWQYxG6j7xjPDj4w3eoUygxivhoSO9BrzCDOBlm7CCKhMkbYxkugRGnNQ4004I0W6jXHEDKEFtHmTLDCkNti5jW4hBtR8k2gg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"

/***/ }),

/***/ 143:
/*!***************************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/static/play_icn_loop.png ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKIAAACiCAMAAAD1LOYpAAABqlBMVEX///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8LmKHRAAAAjnRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESl6w4zMhnmiMTvUgUFct7qi4WxVoZRnKSrbrDjxsXUZSpGlQdJLKCPSYeXDvCfBgvSsZzIU/KoCxLQZy8W8lqnleZrl1vwCccaKFwK6h5d5ZSNSJFQ8e+NDGxTpV2dKZNHyooom1mbp9ZJUI/SUxxejM6WDlWgLtQRJPEmXcSNQAACWpJREFUeNrt3Pl/1EQUAHDSbqHttt0DWMCFLGItFgpUrBxSjsrpVRRQEVFRqYIiXqAIXih48z+bSTaZeTNv3rxJdms/fvJ+Auzx9c1Mks28N6tWlVFGGWWUUUYZZZTxP40AiZUnImLFwpZXiv7GAUcsG9Nb5oT2UzeQN/qDDHrmQ5krJ3125HL6Bs1gIXsG9JFxnMWNLKBkVCxBKQsS+T4VNARDZfba6AZC3pA9SGRuIhPo1KlKCzKnkQXEeatBcJC5iC4hClxtCx3ZCyITyNCZSCyR/kZaaAA1zho1dKQlkb5EJ3BQAdpsJpMyehIp4aCWQo03jIREwsEuQHQJTaBVpyi1RBYyEkI7UCONxAGR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"

/***/ }),

/***/ 144:
/*!******************************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/static/play_icn_shuffle.png ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKIAAACiCAMAAAD1LOYpAAAB7FBMVEX////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////zN5IfAAAApHRSTlMAAQIDBAUGBwgJCgsMDQ4PEBGepSoSzMJSgharLxMUxVgViBk/ssqtbRshYpi3sTO2y8BfHHHGWruVHhcYQLREui5pyVlkvDWGw3Y5sDIjn70tGpKFKIqHHZRQe6wfi7k3MICTeY5yW1OkTkLIvjYlmZpqf5s7Ir/BV3RcPI9JRaZoR2upXki4x8R8RkNKg7Ukb5Z6Pqqcr2ZhKU9gOEuubGUmVjqqmXwAAAlnSURBVHja7dz5fxNFFABw0iuhhbSBJtVAizVSSBE5jBybIKDSeqIEC0FuL+RQUBFBURERUZFDRcEL1H/UfTO7O/fuzO4s8PGz7xdj+WG/nzc7s8nOezNrVhZZZJFFFllkkUUW/+PI0XFfopRxn7LuhTRnJ+4Vqkse6SkTwjSgaeO64oQdZEo4hdK2r8tSJDCmj5MgLQjjCLohNI1JgcYuIaKRSYgxbT1+RCiNibF8UhkTYUpDozFQ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"

/***/ }),

/***/ 145:
/*!***************************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/static/play_btn_prev.png ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 146:
/*!***************************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/static/play_btn_play.png ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 147:
/*!****************************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/static/play_btn_pause.png ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 148:
/*!***************************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/static/play_btn_next.png ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 149:
/*!**************************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/static/play_icn_src.png ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 15:
/*!*****************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/store/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 16));
var _logger = _interopRequireDefault(__webpack_require__(/*! vuex/dist/logger */ 17));
var _state = _interopRequireDefault(__webpack_require__(/*! ./state.js */ 18));
var _mutations = _interopRequireDefault(__webpack_require__(/*! ./mutations.js */ 19));
var _actions = _interopRequireDefault(__webpack_require__(/*! ./actions.js */ 21));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_vue.default.use(_vuex.default);

var debug = "development" !== 'production';

var store = new _vuex.default.Store({
  state: _state.default,
  mutations: _mutations.default,
  actions: _actions.default,
  strict: debug,
  plugins: debug ? [(0, _logger.default)()] : [] });var _default =


store;exports.default = _default;

/***/ }),

/***/ 16:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),

/***/ 17:
/*!******************************************!*\
  !*** ./node_modules/vuex/dist/logger.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    store.subscribe(function (mutation, state) {
      if (typeof logger === 'undefined') {
        return
      }
      var nextState = deepCopy(state);

      if (filter(mutation, prevState, nextState)) {
        var time = new Date();
        var formattedTime = " @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3));
        var formattedMutation = mutationTransformer(mutation);
        var message = "mutation " + (mutation.type) + formattedTime;
        var startMessage = collapsed
          ? logger.groupCollapsed
          : logger.group;

        // render
        try {
          startMessage.call(logger, message);
        } catch (e) {
          console.log(message);
        }

        logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
        logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
        logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));

        try {
          logger.groupEnd();
        } catch (e) {
          logger.log('—— log end ——');
        }
      }

      prevState = nextState;
    });
  }
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

return createLogger;

})));


/***/ }),

/***/ 178:
/*!*********************************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/static/play_icn_src_footer.png ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 18:
/*!*****************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/store/state.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var state = {
  song: null, //当前播放歌曲数据
  // song: {
  //     al: {
  //         picUrl: 'http://p1.music.126.net/gk7CUPP62r9bidqVJwgNhQ==/109951163375219616.jpg', //图片
  //         name: 'PIT' //名字
  //     },
  //     id: null, //id
  //     src: '', //地址
  //     _singer: '' //歌手
  // }, //当前播放歌曲数据
  audio: null,
  mode: 1, //当前播放模式,1-单曲循环,2-顺序播放,3-随机播放
  songList: [] //播放列表
};var _default =

state;exports.default = _default;

/***/ }),

/***/ 181:
/*!***********************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/static/play_icon.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 182:
/*!************************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/static/pause_icon.png ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 19:
/*!*********************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/store/mutations.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _constants = __webpack_require__(/*! ./constants.js */ 20);var _mutations;function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _createForOfIteratorHelper(o) {if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e2) {throw _e2;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var it,normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e3) {didErr = true;err = _e3;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var mutations = (_mutations = {}, _defineProperty(_mutations,
_constants.UPDATELYRIC, function (state, payload) {
  //更新歌词
  state.audio.LyricList = payload.LyricList;
  console.log('更新歌词', payload.LyricList);
  payload.callback && payload.callback();
}), _defineProperty(_mutations,
_constants.UPDATE, function (state, payload) {var
  src = payload.src,coverImgUrl = payload.coverImgUrl,singer = payload.singer,title = payload.title,id = payload.id,_name = payload._name,_singer = payload._singer,_picUrl = payload._picUrl,song = payload.song;

  state.audio.src = src;
  state.audio.coverImgUrl = coverImgUrl;
  state.audio.singer = singer;
  state.audio.title = title;
  state.audio.id = id;
  state.audio._name = _name;
  state.audio._singer = _singer;
  state.audio._picUrl = _picUrl;
  state.song = song;
  state.song.src = src;

  payload.callback && payload.callback();
}), _defineProperty(_mutations,
_constants.SETGLOBALDATA, function (state, payload) {var
  key = payload.key,value = payload.value;
  state[key] = value;
}), _defineProperty(_mutations,
_constants.PREVSONG, function (state, payload) {var _iterator = _createForOfIteratorHelper(
  state.songList.entries()),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var _step$value = _slicedToArray(_step.value, 2),index = _step$value[0],item = _step$value[1];
      if (item.id === state.song.id) {
        if (index === 0) {
          uni.showToast({
            title: '没有了 o(╥﹏╥)o ',
            icon: 'none',
            duration: 1000 });

          return;
        }
        payload.callback(state.songList[index - 1]);
      }
    }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
}), _defineProperty(_mutations,
_constants.NEXTSONG, function (state, payload) {var _iterator2 = _createForOfIteratorHelper(
  state.songList.entries()),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var _step2$value = _slicedToArray(_step2.value, 2),index = _step2$value[0],item = _step2$value[1];
      if (item.id === state.song.id) {
        if (index === state.songList.length - 1) {
          uni.showToast({
            title: '没有了 o(╥﹏╥)o ',
            icon: 'none',
            duration: 1000 });

          return;
        }
        payload.callback(state.songList[index + 1]);
        return;
      }
    }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}
}), _mutations);var _default =


mutations;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 192:
/*!****************************************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/wxcomponents/vant-weapp/icon/index.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _component = __webpack_require__(/*! ../common/component */ 193);
(0, _component.VantComponent)({
  props: {
    info: null,
    name: String,
    size: String,
    color: String,
    customStyle: String,
    classPrefix: {
      type: String,
      value: 'van-icon' } },


  methods: {
    onClick: function onClick() {
      this.$emit('click');
    } } });

/***/ }),

/***/ 193:
/*!**********************************************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/wxcomponents/vant-weapp/common/component.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.VantComponent = VantComponent;var _basic = __webpack_require__(/*! ../mixins/basic */ 194);
var _index = __webpack_require__(/*! ../mixins/observer/index */ 195);function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

function mapKeys(source, target, map) {
  Object.keys(map).forEach(function (key) {
    if (source[key]) {
      target[map[key]] = source[key];
    }
  });
}

function VantComponent(vantOptions) {
  if (vantOptions === void 0) {
    vantOptions = {};
  }

  var options = {};
  mapKeys(vantOptions, options, {
    data: 'data',
    props: 'properties',
    mixins: 'behaviors',
    methods: 'methods',
    beforeCreate: 'created',
    created: 'attached',
    mounted: 'ready',
    relations: 'relations',
    destroyed: 'detached',
    classes: 'externalClasses' });

  var _vantOptions = vantOptions,
  relation = _vantOptions.relation;

  if (relation) {
    options.relations = Object.assign(options.relations || {}, _defineProperty({},
    "../" + relation.name + "/index", relation));

  } // add default externalClasses


  options.externalClasses = options.externalClasses || [];
  options.externalClasses.push('custom-class'); // add default behaviors

  options.behaviors = options.behaviors || [];
  options.behaviors.push(_basic.basic); // map field to form-field behavior

  if (vantOptions.field) {
    options.behaviors.push('wx://form-field');
  } // add default options


  options.options = {
    multipleSlots: true,
    addGlobalClass: true };

  (0, _index.observe)(vantOptions, options);
  Component(options);
}

/***/ }),

/***/ 194:
/*!******************************************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/wxcomponents/vant-weapp/mixins/basic.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.basic = void 0;var basic = Behavior({
  methods: {
    $emit: function $emit() {
      this.triggerEvent.apply(this, arguments);
    },
    getRect: function getRect(selector, all) {
      var _this = this;

      return new Promise(function (resolve) {
        wx.createSelectorQuery().in(_this)[all ? 'selectAll' : 'select'](selector).boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }

          if (!all && rect) {
            resolve(rect);
          }
        }).exec();
      });
    } } });exports.basic = basic;

/***/ }),

/***/ 195:
/*!***************************************************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/wxcomponents/vant-weapp/mixins/observer/index.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.observe = observe;var _behavior = __webpack_require__(/*! ./behavior */ 196);
var _props = __webpack_require__(/*! ./props */ 197);
function observe(vantOptions, options) {
  var watch = vantOptions.watch,
  computed = vantOptions.computed;
  options.behaviors.push(_behavior.behavior);

  if (watch) {
    var props = options.properties || {};
    Object.keys(watch).forEach(function (key) {
      if (key in props) {
        var prop = props[key];

        if (prop === null || !('type' in prop)) {
          prop = {
            type: prop };

        }

        prop.observer = watch[key];
        props[key] = prop;
      }
    });
    options.properties = props;
  }

  if (computed) {
    options.methods = options.methods || {};

    options.methods.$options = function () {
      return vantOptions;
    };

    if (options.properties) {
      (0, _props.observeProps)(options.properties);
    }
  }
}

/***/ }),

/***/ 196:
/*!******************************************************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/wxcomponents/vant-weapp/mixins/observer/behavior.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.behavior = void 0;var behavior = Behavior({
  created: function created() {
    var _this = this;

    if (!this.$options) {
      return;
    }

    var cache = {};

    var _this$$options = this.$options(),
    computed = _this$$options.computed;

    var keys = Object.keys(computed);

    this.calcComputed = function () {
      var needUpdate = {};
      keys.forEach(function (key) {
        var value = computed[key].call(_this);

        if (cache[key] !== value) {
          cache[key] = needUpdate[key] = value;
        }
      });
      return needUpdate;
    };
  },
  attached: function attached() {
    this.set();
  },
  methods: {
    // set data and set computed data
    set: function set(data, callback) {
      if (data) {
        this.setData(data, callback);
      }

      if (this.calcComputed) {
        this.setData(this.calcComputed());
      }
    } } });exports.behavior = behavior;

/***/ }),

/***/ 197:
/*!***************************************************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/wxcomponents/vant-weapp/mixins/observer/props.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.observeProps = observeProps;function observeProps(props) {
  if (!props) {
    return;
  }

  Object.keys(props).forEach(function (key) {
    var prop = props[key];

    if (prop === null || !('type' in prop)) {
      prop = {
        type: prop };

    }

    var _prop = prop,
    observer = _prop.observer;

    prop.observer = function () {
      if (observer) {
        if (typeof observer === 'string') {
          observer = this[observer];
        }

        observer.apply(this, arguments);
      }

      this.set();
    };

    props[key] = prop;
  });
}

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!*********************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/store/constants.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.SETGLOBALDATA = exports.NEXTSONG = exports.PREVSONG = exports.UPDATE = exports.UPDATELYRIC = void 0;var UPDATELYRIC = 'UPDATELYRIC'; //更新歌词
exports.UPDATELYRIC = UPDATELYRIC;var UPDATE = 'UPDATE'; //更新歌曲
exports.UPDATE = UPDATE;var PREVSONG = 'PREVSONG'; //上一首
exports.PREVSONG = PREVSONG;var NEXTSONG = 'NEXTSONG'; //下一首
exports.NEXTSONG = NEXTSONG;var SETGLOBALDATA = 'SETGLOBALDATA'; //设置redux
exports.SETGLOBALDATA = SETGLOBALDATA;

/***/ }),

/***/ 201:
/*!*******************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/static/gedan.jpg ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/gedan.jpg";

/***/ }),

/***/ 21:
/*!*******************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/store/actions.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _constants = __webpack_require__(/*! ./constants.js */ 20);
var _index = __webpack_require__(/*! ../api/index */ 22);

var actions = {
  updateLyric: function updateLyric(_ref, payload) {var commit = _ref.commit;var
    id = payload.id;
    (0, _index.getLyric)({ id: id }).then(function (res) {
      console.log(res);
      var LyricList =
      res.lrc &&
      res.lrc.lyric.split('\n').map(function (item) {
        var arr = item.split(']');
        var time = arr[0].substr(1);
        console.log(arr);
        return {
          time: time.split(':')[0] * 60 + time.split(':')[1] * 1 | 0,
          Text: arr[1] };

      });
      commit(_constants.UPDATELYRIC, {
        LyricList: LyricList.filter(function (item) {return item.Text;}), //过滤掉空歌词
        callback: payload.callback });

    });
  },
  update: function update(_ref2, payload) {var commit = _ref2.commit;var
    item = payload.item;
    (0, _index.getSong)({ id: item.id }).then(function (res) {
      console.log(res);
      if (!res.data[0].url) {
        console.log('该首歌曲无法播放');
        uni.showModal({
          title: '抱歉',
          content: '该首歌曲无法播放' });

      }
      commit(_constants.UPDATE, {
        src: res.data[0].url,
        coverImgUrl: item.al.picUrl,
        singer: item.ar.
        map(function (i) {
          return i.name;
        }).
        join(' / '),
        title: item.name,
        id: item.id,
        _name: item.name,
        _singer: item.ar.
        map(function (i) {
          return i.name;
        }).
        join(' / '),
        _picUrl: item.al.picUrl,
        song: item,
        callback: payload.callback });

    });
  },
  setGlobalData: function setGlobalData(_ref3, payload) {var commit = _ref3.commit;
    commit(_constants.SETGLOBALDATA, payload);
  },
  prev: function prev(_ref4, payload) {var commit = _ref4.commit;
    commit(_constants.PREVSONG, payload);
  },
  next: function next(_ref5, payload) {var commit = _ref5.commit;
    commit(_constants.NEXTSONG, payload);
  } };var _default =


actions;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 22:
/*!***************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/api/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.toplist = exports.getLyric = exports.getSong = exports.getSongList = exports.getPersonalized = void 0;var _index = _interopRequireDefault(__webpack_require__(/*! ../config/index */ 23));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function Api(path) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise(function (resolve, reject) {
    uni.request({
      url: _index.default.serverUrl + path,
      data: data,
      header: {
        'content-type': 'application/json' },

      success: function success(res) {
        if (res.statusCode >= 200 && res.statusCode <= 300) {
          resolve(res.data);
        } else {
          if (res.errMsg) {
            uni.showToast({
              title: res.errMsg,
              icon: 'none',
              duration: 1000 });

          } else {
            uni.showToast({
              title: '出错了',
              icon: 'none',
              duration: 1000 });

            uni.hideLoading();
          }
        }
      },
      fail: function fail(err) {
        uni.showToast({
          title: err.errMsg,
          icon: 'none',
          duration: 1000 });

        uni.hideLoading();
        reject(err);
      } });

  });
}
//推荐歌单
var getPersonalized = function getPersonalized() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return new Api('/api/song/personalized', data);};
//歌单详情
exports.getPersonalized = getPersonalized;var getSongList = function getSongList() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return new Api('/api/song/detail', data);};
//歌曲详情
exports.getSongList = getSongList;var getSong = function getSong() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return new Api('/api/song/url', data);};
//获取歌词
exports.getSong = getSong;var getLyric = function getLyric() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return new Api('/api/song/lyric', data);};
//所有榜单--这个用歌单详情获取数据
exports.getLyric = getLyric;var toplist = function toplist() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return new Api('/api/song/toplist', data);};exports.toplist = toplist;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 23:
/*!******************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/config/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  //   serverUrl: 'https://music.befirer.com'
  serverUrl: 'http://47.92.193.229:100/index.php'
  //serverUrl: 'http://localhost:3000' //手机扫码体验请把地址改为局域网ip
  //serverUrl: 'http://www.fastadmin.com:81'
};exports.default = _default;

/***/ }),

/***/ 246:
/*!********************************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/components/uni-icons/icons.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  'contact': "\uE100",
  'person': "\uE101",
  'personadd': "\uE102",
  'contact-filled': "\uE130",
  'person-filled': "\uE131",
  'personadd-filled': "\uE132",
  'phone': "\uE200",
  'email': "\uE201",
  'chatbubble': "\uE202",
  'chatboxes': "\uE203",
  'phone-filled': "\uE230",
  'email-filled': "\uE231",
  'chatbubble-filled': "\uE232",
  'chatboxes-filled': "\uE233",
  'weibo': "\uE260",
  'weixin': "\uE261",
  'pengyouquan': "\uE262",
  'chat': "\uE263",
  'qq': "\uE264",
  'videocam': "\uE300",
  'camera': "\uE301",
  'mic': "\uE302",
  'location': "\uE303",
  'mic-filled': "\uE332",
  'speech': "\uE332",
  'location-filled': "\uE333",
  'micoff': "\uE360",
  'image': "\uE363",
  'map': "\uE364",
  'compose': "\uE400",
  'trash': "\uE401",
  'upload': "\uE402",
  'download': "\uE403",
  'close': "\uE404",
  'redo': "\uE405",
  'undo': "\uE406",
  'refresh': "\uE407",
  'star': "\uE408",
  'plus': "\uE409",
  'minus': "\uE410",
  'circle': "\uE411",
  'checkbox': "\uE411",
  'close-filled': "\uE434",
  'clear': "\uE434",
  'refresh-filled': "\uE437",
  'star-filled': "\uE438",
  'plus-filled': "\uE439",
  'minus-filled': "\uE440",
  'circle-filled': "\uE441",
  'checkbox-filled': "\uE442",
  'closeempty': "\uE460",
  'refreshempty': "\uE461",
  'reload': "\uE462",
  'starhalf': "\uE463",
  'spinner': "\uE464",
  'spinner-cycle': "\uE465",
  'search': "\uE466",
  'plusempty': "\uE468",
  'forward': "\uE470",
  'back': "\uE471",
  'left-nav': "\uE471",
  'checkmarkempty': "\uE472",
  'home': "\uE500",
  'navigate': "\uE501",
  'gear': "\uE502",
  'paperplane': "\uE503",
  'info': "\uE504",
  'help': "\uE505",
  'locked': "\uE506",
  'more': "\uE507",
  'flag': "\uE508",
  'home-filled': "\uE530",
  'gear-filled': "\uE532",
  'info-filled': "\uE534",
  'help-filled': "\uE535",
  'more-filled': "\uE537",
  'settings': "\uE560",
  'list': "\uE562",
  'bars': "\uE563",
  'loop': "\uE565",
  'paperclip': "\uE567",
  'eye': "\uE568",
  'arrowup': "\uE580",
  'arrowdown': "\uE581",
  'arrowleft': "\uE582",
  'arrowright': "\uE583",
  'arrowthinup': "\uE584",
  'arrowthindown': "\uE585",
  'arrowthinleft': "\uE586",
  'arrowthinright': "\uE587",
  'pulldown': "\uE588",
  'closefill': "\uE589",
  'sound': "\uE590",
  'scan': "\uE612" };exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!*************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/pages.json ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _createSuper(Derived) {return function () {var Super = _getPrototypeOf(Derived),result;if (_isNativeReflectConstruct()) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);var _super = _createSuper(Stat);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _super.call(this);
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@next","_id":"@dcloudio/uni-stat@2.0.0-26920200421003","_inBundle":false,"_integrity":"sha512-Aa6R66ZF2pIK9XB+Y7QbSW2GficyNTcdT7fnxFw5gY1eeY+u8oT7rTpZrL1W2qKbqf2FbsNPDjZrg1nRj6RxkQ==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@next","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"next","saveSpec":null,"fetchSpec":"next"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-26920200421003.tgz","_shasum":"c08ebc00afa71edd9ed388fc4bf411e42d458ac5","_spec":"@dcloudio/uni-stat@next","_where":"/Users/guoshengqiang/Documents/dcloud-plugins/release/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"a7035ab7f2a83dbc2c75090de34f68e5a01224a7","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-26920200421003"};

/***/ }),

/***/ 7:
/*!******************************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/pages.json?{"type":"style"} ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/index/index": { "navigationBarTitleText": "启动页" }, "pages/index/guide": { "navigationBarTitleText": "" }, "pages/dmusic/index": { "navigationBarTitleText": "动音乐", "navigationBarBackgroundColor": "#00e4ff" }, "pages/dynamic/index": { "navigationBarTitleText": "首页", "navigationStyle": "custom" }, "pages/me/index": { "navigationBarTitleText": "我的", "navigationBarBackgroundColor": "#00e4ff" }, "pages/recommend/index": { "navigationBarTitleText": "推荐", "navigationBarBackgroundColor": "#00e4ff" }, "pages/ranking/rankinglist": { "navigationBarTitleText": "排行榜", "navigationBarBackgroundColor": "#00e4ff" }, "pages/ranking/ranking": { "navigationBarTitleText": "排行榜", "navigationBarBackgroundColor": "#00e4ff" }, "pages/musiclibrary/musiclibrary": { "navigationBarTitleText": "歌单", "navigationBarBackgroundColor": "#00e4ff" }, "pages/songsheet/songsheet": { "navigationBarTitleText": "歌单", "navigationBarBackgroundColor": "#00e4ff" }, "pages/singer/singer": { "navigationBarTitleText": "歌手", "navigationBarBackgroundColor": "#00e4ff" }, "pages/login/login": { "navigationBarTitleText": "登录" }, "pages/login/forget": { "navigationBarTitleText": "找回密码" }, "pages/login/register": { "navigationBarTitleText": "注册" }, "pages/test/test": {}, "pages/song/index": { "titleNView": true }, "pages/musiclibrary/index": { "navigationBarTitleText": "乐库", "navigationBarBackgroundColor": "#00e4ff" }, "pages/webView/webView": {} }, "globalStyle": { "navigationBarTextStyle": "black", "navigationBarTitleText": "uni-app", "navigationBarBackgroundColor": "#F8F8F8", "backgroundColor": "#F8F8F8" } };exports.default = _default;

/***/ }),

/***/ 75:
/*!***********************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/static/play-cell.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 76:
/*!************************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/static/pause-item.png ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAACpSURBVHja7NfRDoAgCAVQ7/9/9O2prTQRJIM1e1Y46jQAyWL4tIOhDQglwKS0YEYAT2IVogegY3tNc58A9J6rJY4GAOf2U0LUgLeTD+NeAauSi/F7AAwCQUgAC+IEaFcvIWmc3wVoVzADaMaB7TX4ElAiALexNcDyym3ABvwTEH4NQx6i8Kc4xc9oJsBSQEhBEl6SpShKU5Tl3ubE3ZikaM3SNKfL2/NjAM7dubeByVc9AAAAAElFTkSuQmCC"

/***/ }),

/***/ 77:
/*!***********************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/static/play-list.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 8:
/*!*****************************************************************************!*\
  !*** C:/Users/Dell/Desktop/dmusic v1.1.1/dmusic/pages.json?{"type":"stat"} ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "" };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map