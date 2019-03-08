const hash = require('object-hash')
const moment = require('moment')
const Lock = require('./Lock')

module.exports = function (func, option = { consis: x => x, timeBrake: 10000 }) {
  const lock = new Lock()
  let ret = []
  return async function (parameter) {
    const argsArray = Array.from(arguments)
    const consArgs = option.consis(argsArray)
    const hashCode = hash(consArgs)
    await lock.obtainLock()
    const target = ret.find(x => x.hash === hashCode)
    if (target) {
      if (moment().unix() < target.expire) {
        return target.data
      }
      ret = ret.filter(x => x.hash !== hashCode)
    }
    const data = await func(parameter)
    const expire = moment().add(option.timeBrake, 'ms').unix()
    ret.push({
      hash: hashCode,
      data,
      expire
    })
    await lock.releaseLock()
    return data
  }
}