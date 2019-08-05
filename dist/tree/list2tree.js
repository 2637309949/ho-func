"use strict";

// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

/**
 * List2Tree
 *
 * @param {Array} list
 * @param {Object} option
 *
 * @api public
 */
module.exports = function (_ref) {
  let {
    list,
    option = {
      childrenField: 'children',
      parentFeild: 'parent',
      idFeild: 'id'
    }
  } = _ref;
  let node;
  const map = {};
  const roots = [];

  for (let i = 0; i < list.length; i += 1) {
    map[list[i][option.idFeild]] = i;
    list[i][option.childrenField] = [];
  }

  for (let i = 0; i < list.length; i += 1) {
    node = list[i];

    if (node[option.parentFeild]) {
      list[map[node[option.parentFeild]]][option.childrenField].push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
};