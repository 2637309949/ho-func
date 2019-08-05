"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
function makeid(num) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';

  for (let i = 0; i < num; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}
/**
 * Tree2List
 *
 * @param {Array} tree
 * @param {Object} option
 *
 * @api public
 */


module.exports = function (_ref) {
  let {
    tree: t,
    option = {
      childrenField: 'children',
      parentFeild: 'parent',
      idFeild: 'id'
    }
  } = _ref;
  const list = [];

  function traverse(tree) {
    for (let i = 0; i < tree.length; i += 1) {
      const node = tree[i];

      if (node[option.idFeild] === undefined) {
        node[option.idFeild] = node[option.idFeild] || makeid(32);
      }

      const children = node[option.childrenField];
      delete node[option.childrenField];
      list.push(node);

      if (Array.isArray(children) && children.length > 0) {
        traverse(children.map(x => _objectSpread({}, x, {
          [option.parentFeild]: node[option.idFeild]
        })));
      }
    }
  }

  traverse(t);
  return list;
};