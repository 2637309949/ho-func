"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @author [Double]
 * @email [2637309949@qq.com]
 * @create date 2019-03-07 10:05:31
 * @modify date 2019-03-07 10:05:31
 * @desc [description]
 */
const repo = module.exports = function LockClass() {
  this.Lock = false;
};

repo.prototype.delayTime =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (n) {
    return new Promise((resolve, reject) => {
      setTimeout(n, resolve);
    });
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

repo.prototype.while =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(function* (func, n) {
    const ret = yield func();

    if (!ret) {
      yield this.delayTime(n);
      yield this.while(func, n);
    }
  });

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

repo.prototype.obtainLock =
/*#__PURE__*/
_asyncToGenerator(function* () {
  if (this.Lock) {
    yield this.while(function () {
      return !this.Lock;
    }, 1000);
  }

  this.Lock = true;
});
repo.prototype.releaseLock =
/*#__PURE__*/
_asyncToGenerator(function* () {
  this.Lock = false;
});