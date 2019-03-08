/**
 * @author [Double]
 * @email [2637309949@qq.com]
 * @create date 2019-03-07 10:05:31
 * @modify date 2019-03-07 10:05:31
 * @desc [description]
 */
const repo = module.exports = function LockClass () {
  this.Lock = false
}

repo.prototype.delayTime = async function (n) {
  return new Promise((resolve, reject) => {
    setTimeout(n, resolve)
  })
}

repo.prototype.while = async function (func, n) {
  const ret = await func()
  if (!ret) {
    await this.delayTime(n)
    await this.while(func, n)
  }
}

repo.prototype.obtainLock = async function () {
  if (this.Lock) {
    await this.while(function () {
      return !this.Lock
    }, 1000)
  }
  this.Lock = true
}

repo.prototype.releaseLock = async function () {
  this.Lock = false
}
