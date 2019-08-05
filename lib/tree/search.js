// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const tree2list = require('./tree2list')

const repo = module.exports

/**
 * searchNodes
 *
 * @param {Array} list
 * @param {Function} filter
 * @param {Object} option
 *
 * @api public
 */
repo.searchNodes = function ({ tree, filter, option = { childrenField: 'children', parentFeild: 'parent', idFeild: 'id' } }) {
  const list = tree2list({ tree, option })
  return list.filter(filter)
}

/**
 * searchNodeParents
 *
 * @param {Array} tree
 * @param {Function} filter
 * @param {Object} option
 *
 * @api public
 */
repo.searchNodeParents = function ({ tree, filter, option = { childrenField: 'children', parentFeild: 'parent', idFeild: 'id' } }) {
  const list = tree2list({ tree, option })
  const nodes = list.filter(filter)
  const ret = []
  function traverse (item, parents) {
    const pNode = list.find(x => x[option.idFeild] === item[option.parentFeild])
    if (pNode) {
      parents.push(pNode)
    }
    if (pNode && pNode[option.parentFeild]) {
      traverse(pNode, parents)
    }
  }
  for (const node of nodes) {
    const parents = []
    traverse(node, parents)
    ret.push({
      node,
      parents
    })
  }
  return ret
}
