/**
 * @author [Double]
 * @email [2637309949@qq.com]
 * @create date 2019-03-07 10:05:31
 * @modify date 2019-03-07 10:05:31
 * @desc [description]
 */

/**
 * List2Tree
 *
 * @param {Array} list
 * @param {Object} option
 *
 * @api public
 */
module.exports = function ({ list, option = { childrenField: 'children', parentFeild: 'parent', idFeild: 'id' } }) {
  let node
  const map = {}
  const roots = []
  for (let i = 0; i < list.length; i += 1) {
    map[list[i][option.idFeild]] = i
    list[i][option.childrenField] = []
  }
  for (let i = 0; i < list.length; i += 1) {
    node = list[i]
    if (node[option.parentFeild]) {
      list[map[node[option.parentFeild]]][option.childrenField].push(node)
    } else {
      roots.push(node)
    }
  }
  return roots
}
