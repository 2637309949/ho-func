/**
 * @author [Double]
 * @email [2637309949@qq.com]
 * @create date 2019-03-07 10:05:31
 * @modify date 2019-03-07 10:05:31
 * @desc [description]
 */
function makeid (num) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let text = ''
  for (let i = 0; i < num; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

/**
 * Tree2List
 *
 * @param {Array} tree
 * @param {Object} option
 *
 * @api public
 */
module.exports = function ({ tree: t, option = { childrenField: 'children', parentFeild: 'parent', idFeild: 'id' } }) {
  const list = []
  function traverse (tree) {
    for (let i = 0; i < tree.length; i += 1) {
      const node = tree[i]
      if (node[option.idFeild] === undefined) {
        node[option.idFeild] = node[option.idFeild] || makeid(32)
      }
      const children = node[option.childrenField]
      delete node[option.childrenField]
      list.push(node)
      if (Array.isArray(children) && children.length > 0) {
        traverse(children.map(x => ({ ...x, [option.parentFeild]: node[option.idFeild] })))
      }
    }
  }
  traverse(t)
  return list
}
