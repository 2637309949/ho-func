// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const JSZip = require('jszip')
const path = require('path')
const fetch = require('node-fetch')
const fs = require('fs')
const os = require('os')

const repo = module.exports

function downloadFile (uri, _path, { name }) {
  const fileName = name || path.parse(uri).base
  const filePath = path.join(_path, fileName)
  return fetch(uri)
    .then(res => {
      const dest = fs.createWriteStream(filePath)
      res.body.pipe(dest)
      return filePath
    })
}

repo.httpZipFiles = function (list, zipPath) {
  return new Promise((resolve, reject) => {
    list = list.map(file => {
      let name
      let uri
      if (typeof file === 'object') {
        name = file.name
        uri = file.uri
      } else if (typeof file === 'string') {
        name = path.parse(file).base
        uri = file
      } else {
        reject(new Error('no suppert file type:', typeof file))
      }
      return {
        name,
        uri
      }
    })
    resolve(Promise.all(list.map(async x => {
      const {name, uri} = x
      const filePath = await downloadFile(uri, os.tmpdir(), { name })
      return {
        name,
        path: filePath
      }
    })))
  }).then(list => {
    const zip = new JSZip()
    list.forEach(file => {
      const {name, path} = file
      if (fs.existsSync(path)) {
        var stream = fs.createReadStream(path)
        zip.file(name, stream)
      }
    })
    if (!zipPath) {
      const tmpDir = os.tmpdir()
      zipPath = path.join(tmpDir, `${Math.random().toString(36).substring(7)}.zip`)
    }
    return new Promise((resolve, reject) => {
      zip
        .generateNodeStream({type: 'nodebuffer', streamFiles: true})
        .pipe(fs.createWriteStream(zipPath))
        .on('finish', function () {
          resolve(zipPath)
        })
        .on('error', function (err) {
          reject(err)
        })
    })
  })
}

repo.localZipFiles = function (list, zipPath) {
  const zip = new JSZip()
  list.forEach(file => {
    let fileName
    let filePath
    if (typeof file === 'object') {
      fileName = file.name
      fileName = file.path
    } else if (typeof file === 'string') {
      fileName = path.parse(file).base
      filePath = file
    } else {
      throw new Error('no suppert file type:', typeof file)
    }
    if (fs.existsSync(filePath)) {
      var stream = fs.createReadStream(filePath)
      zip.file(fileName, stream)
    }
  })

  if (!zipPath) {
    const tmpDir = os.tmpdir()
    zipPath = path.join(tmpDir, `${Math.random().toString(36).substring(7)}.zip`)
  }
  return new Promise((resolve, reject) => {
    zip
      .generateNodeStream({type: 'nodebuffer', streamFiles: true})
      .pipe(fs.createWriteStream(zipPath))
      .on('finish', function () {
        resolve(zipPath)
      })
      .on('error', function (err) {
        reject(err)
      })
  })
}
