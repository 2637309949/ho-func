"use strict";

// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
const _ = require('lodash');

module.exports = function (items) {
  let groupBy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x => x;
  const itemsWithIndex = items.map((x, index) => ({
    item: x,
    index
  }));

  const itemsGroupBy = _.groupBy(itemsWithIndex, x => groupBy(x.item));

  const groupKeys = Object.keys(itemsGroupBy);
  const dupIndex = groupKeys.reduce((acc, curr) => {
    const items = itemsGroupBy[curr];

    if (items.length >= 2) {
      acc[curr] = items.map(x => x.index);
    }

    return acc;
  }, {});
  return dupIndex;
};