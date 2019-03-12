"use strict";

/**
 * @author [Double]
 * @email [2637309949@qq.com]
 * @create date 2019-03-07 10:05:31
 * @modify date 2019-03-07 10:05:31
 * @desc [description]
 */
const _ = require('lodash');

const tree2list = require('./tree2list');

const list2tree = require('./list2tree');

const repo = module.exports;

function listTransferDown(_ref) {
  let {
    list,
    transfer,
    option
  } = _ref;

  const newList = _.cloneDeep(list);

  const topItems = newList.filter(x => !newList.find(x1 => x1[option.idFeild] === x[option.parentFeild]));

  function traverse(items, attribute) {
    for (const item of items) {
      const attNew = transfer(item, attribute);
      Object.assign(item, attNew);
      const topItems = newList.filter(x => x[option.parentFeild] === item[option.idFeild]);
      traverse(topItems, attNew);
    }
  }

  traverse(topItems, option.default);
  return newList;
}

function listTransferUp(_ref2) {
  let {
    list,
    transfer,
    accumulate,
    option
  } = _ref2;

  const newList = _.cloneDeep(list);

  const childItems = newList.filter(x => !newList.find(x1 => x1[option.idFeild] === x[option.parentFeild]));

  function traverse(items, atts) {
    let acc;

    for (const item of items) {
      let curr;
      const childItems = newList.filter(x => x[option.parentFeild] === item[option.idFeild]);

      if (childItems.length === 0) {
        const attNew = transfer(item, atts);
        curr = attNew;
        Object.assign(item, curr);
      } else {
        curr = traverse(childItems, atts);
        Object.assign(item, accumulate(null, curr, item));
      }

      if (acc) {
        acc = accumulate(acc, curr, item);
      } else {
        acc = curr;
      }
    }

    return acc;
  }

  traverse(childItems, option.default);
  return newList;
}

repo.listTransfer = function listTransfer(_ref3) {
  let {
    list,
    transfer,
    accumulate,
    option
  } = _ref3;
  option = Object.assign({
    default: {},
    direct: 'down',
    childrenField: 'children',
    parentFeild: 'parent',
    idFeild: 'id'
  }, option);
  return option.direct === 'down' ? listTransferDown({
    list,
    transfer,
    option
  }) : listTransferUp({
    list,
    accumulate,
    transfer,
    option
  });
};

function treeTransferDown(_ref4) {
  let {
    tree,
    transfer,
    option
  } = _ref4;
  let list = tree2list({
    tree,
    option
  });
  list = listTransferDown({
    list,
    transfer,
    option
  });
  return list2tree({
    list,
    option
  });
}

function treeTransferUp(_ref5) {
  let {
    tree,
    option,
    transfer,
    accumulate
  } = _ref5;
  let list = tree2list({
    tree,
    option
  });
  list = listTransferUp({
    list,
    transfer,
    accumulate,
    option
  });
  return list2tree({
    list,
    option
  });
}

repo.treeTransfer = function treeTransfer(_ref6) {
  let {
    tree,
    transfer,
    accumulate,
    option
  } = _ref6;
  option = Object.assign({
    default: '',
    direct: 'down',
    childrenField: 'children',
    parentFeild: 'parent',
    idFeild: 'id'
  }, option);
  return option.direct === 'down' ? treeTransferDown({
    tree,
    transfer,
    option
  }) : treeTransferUp({
    tree,
    accumulate,
    transfer,
    option
  });
};