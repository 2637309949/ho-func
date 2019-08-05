// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

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
