"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const hash = require('object-hash');

const moment = require('moment');

const Lock = require('./Lock');

module.exports = function (func) {
  let option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    consis: x => x,
    timeBrake: 10000
  };
  const lock = new Lock();
  let ret = [];
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(function* (parameter) {
        const argsArray = Array.from(arguments);
        const consArgs = option.consis(argsArray);
        const hashCode = hash(consArgs);
        yield lock.obtainLock();
        const target = ret.find(x => x.hash === hashCode);

        if (target) {
          if (moment().unix() < target.expire) {
            return target.data;
          }

          ret = ret.filter(x => x.hash !== hashCode);
        }

        const data = yield func(parameter);
        const expire = moment().add(option.timeBrake, 'ms').unix();
        ret.push({
          hash: hashCode,
          data,
          expire
        });
        yield lock.releaseLock();
        return data;
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};