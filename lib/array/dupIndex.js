/**
 * @author [Double]
 * @email [2637309949@qq.com]
 * @create date 2019-03-07 10:05:31
 * @modify date 2019-03-07 10:05:31
 * @desc [description]
 */
const _ = require('lodash')

module.exports = function (items, groupBy = x => x) {
  const itemsWithIndex = items.map((x, index) => ({ item: x, index }))
  const itemsGroupBy = _.groupBy(itemsWithIndex, x => groupBy(x.item))
  const groupKeys = Object.keys(itemsGroupBy)
  const dupIndex = groupKeys.reduce((acc, curr) => {
    const items = itemsGroupBy[curr]
    if (items.length >= 2) {
      acc[curr] = items.map(x => x.index)
    }
    return acc
  }, {})
  return dupIndex
}
