// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const is = require('is')
const hash = require('object-hash')

const optionDefault = { isType: x => is.null(x) || is.undefined(x) || is.number(x) || is.boolean(x) || is.string(x) || is.date(x) }

module.exports = function ({ target, source, diffBack, option = optionDefault }, stepPath = '', dataSet = []) {
  if ((typeof target === typeof source && option.isType(target) && option.isType(source)) || (!target || !source)) {
    if (target !== source) {
      if (is.function(diffBack)) {
        const ret = diffBack({
          path: stepPath,
          target,
          source
        })
        dataSet.push(ret)
      } else {
        dataSet.push({
          path: stepPath,
          target: target,
          source: source
        })
      }
    }
  } else if (typeof target === typeof source && is.array(target) && is.array(source)) {
    if (hash(target) !== hash(source)) {
      target.forEach((item, index) => {
        module.exports({ target: item, source: source[index], diffBack, option }, `${stepPath}${stepPath ? '.' : ''}[${index}]`, dataSet)
      })
    }
  } else if (typeof target === typeof source && is.object(target) && is.object(source)) {
    if (Object.keys(target).length >= Object.keys(source).length) {
      Object.keys(target).forEach(key => {
        module.exports({ target: target[key], source: source[key], diffBack, option }, `${stepPath}${stepPath ? '.' : ''}${key}`, dataSet)
      })
    } else {
      Object.keys(source).forEach(key => {
        module.exports({ target: target[key], source: source[key], diffBack, option }, `${stepPath}${stepPath ? '.' : ''}${key}`, dataSet)
      })
    }
  }
  return dataSet
}
