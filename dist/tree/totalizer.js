"use strict";

// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
const accFuncDefault = (acc, curr) => ({
  score: acc.score + curr.score
});

const nodeFuncDefault = x => ({
  score: x.score
});

const childFuncDefault = x => x.children || [];
/**
 * Totalizer
 *
 * @param {Array} tree
 * @param {Function} accFunc
 * @param {Function} nodeFunc
 * @param {Function} childFunc
 * @param {Object} option
 *
 * @api public
 */


module.exports = function (_ref) {
  let {
    tree,
    accFunc = accFuncDefault,
    nodeFunc = nodeFuncDefault,
    childFunc = childFuncDefault,
    option = {
      toHold: false
    }
  } = _ref;
  let acc;

  for (const child of tree) {
    const childChild = childFunc(child);
    let curr;

    if (childChild.length === 0) {
      curr = nodeFunc(child);
    } else {
      curr = module.exports({
        tree: childChild,
        accFunc,
        nodeFunc,
        childFunc,
        option
      });
    }

    if (option.toHold) {
      Object.assign(child, curr);
    }

    if (acc) {
      acc = accFunc(acc, curr, child);
    } else {
      acc = curr;
    }
  }

  return acc;
};