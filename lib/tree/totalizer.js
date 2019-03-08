/**
 * @author [Double]
 * @email [2637309949@qq.com]
 * @create date 2019-03-07 10:05:31
 * @modify date 2019-03-07 10:05:31
 * @desc [description]
 */
const accFuncDefault = (acc, curr) => ({ score: acc.score + curr.score })
const nodeFuncDefault = x => ({ score: x.score })
const childFuncDefault = x => x.children || []

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
module.exports = function ({ tree, accFunc = accFuncDefault, nodeFunc = nodeFuncDefault, childFunc = childFuncDefault, option = { toHold: false } }) {
  let acc
  for (const child of tree) {
    const childChild = childFunc(child)
    let curr
    if (childChild.length === 0) {
      curr = nodeFunc(child)
    } else {
      curr = module.exports({ tree: childChild, accFunc, nodeFunc, childFunc, option })
    }
    if (option.toHold) {
      Object.assign(child, curr)
    }
    if (acc) {
      acc = accFunc(acc, curr, child)
    } else {
      acc = curr
    }
  }
  return acc
}
