"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
const JSZip = require('jszip');

const path = require('path');

const fetch = require('node-fetch');

const fs = require('fs');

const os = require('os');

const repo = module.exports;

function downloadFile(uri, _path, _ref) {
  let {
    name
  } = _ref;
  const fileName = name || path.parse(uri).base;
  const filePath = path.join(_path, fileName);
  return fetch(uri).then(res => {
    const dest = fs.createWriteStream(filePath);
    res.body.pipe(dest);
    return filePath;
  });
}

repo.httpZipFiles = function (list, zipPath) {
  return new Promise((resolve, reject) => {
    list = list.map(file => {
      let name;
      let uri;

      if (typeof file === 'object') {
        name = file.name;
        uri = file.uri;
      } else if (typeof file === 'string') {
        name = path.parse(file).base;
        uri = file;
      } else {
        reject(new Error('no suppert file type:', typeof file));
      }

      return {
        name,
        uri
      };
    });
    resolve(Promise.all(list.map(
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(function* (x) {
        const {
          name,
          uri
        } = x;
        const filePath = yield downloadFile(uri, os.tmpdir(), {
          name
        });
        return {
          name,
          path: filePath
        };
      });

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }())));
  }).then(list => {
    const zip = new JSZip();
    list.forEach(file => {
      const {
        name,
        path
      } = file;

      if (fs.existsSync(path)) {
        var stream = fs.createReadStream(path);
        zip.file(name, stream);
      }
    });

    if (!zipPath) {
      const tmpDir = os.tmpdir();
      zipPath = path.join(tmpDir, `${Math.random().toString(36).substring(7)}.zip`);
    }

    return new Promise((resolve, reject) => {
      zip.generateNodeStream({
        type: 'nodebuffer',
        streamFiles: true
      }).pipe(fs.createWriteStream(zipPath)).on('finish', function () {
        resolve(zipPath);
      }).on('error', function (err) {
        reject(err);
      });
    });
  });
};

repo.localZipFiles = function (list, zipPath) {
  const zip = new JSZip();
  list.forEach(file => {
    let fileName;
    let filePath;

    if (typeof file === 'object') {
      fileName = file.name;
      fileName = file.path;
    } else if (typeof file === 'string') {
      fileName = path.parse(file).base;
      filePath = file;
    } else {
      throw new Error('no suppert file type:', typeof file);
    }

    if (fs.existsSync(filePath)) {
      var stream = fs.createReadStream(filePath);
      zip.file(fileName, stream);
    }
  });

  if (!zipPath) {
    const tmpDir = os.tmpdir();
    zipPath = path.join(tmpDir, `${Math.random().toString(36).substring(7)}.zip`);
  }

  return new Promise((resolve, reject) => {
    zip.generateNodeStream({
      type: 'nodebuffer',
      streamFiles: true
    }).pipe(fs.createWriteStream(zipPath)).on('finish', function () {
      resolve(zipPath);
    }).on('error', function (err) {
      reject(err);
    });
  });
};