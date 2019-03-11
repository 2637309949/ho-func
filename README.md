# Advanced function set
> Advanced tools for arrays and objects.

## Installation

```
npm install ho-func --save
```

## Usage
### Array Tools
#### dupIndex(items, groupBy)  - Find duplicate indexes
- **items** An array element to group.
- **groupBy** Optional character, a function that groups elements. (default: `x => x`)

```javascript
dupIndex([1, 2, 2, 4, 5, 5, 5, 6, 78, 78, 78, 88, 88, 3, 6, 7], x => x)
//=> {
//   '2':   [ 1, 2 ],
//   '5':   [ 4, 5, 6 ],
//   '6':   [ 7, 14 ],
//   '78':  [ 8, 9, 10 ],
//   '88':  [ 11, 12 ]
//}

```
### Tree Tools

#### totalizer({ tree, accFunc, nodeFunc, childFunc, option })  - Cumulative sum procedure
- **tree** An array tree to totalizer.
- **accFunc** Optional character, a function to accumulate all node evaluation results. (default: `(acc, curr) => ({ score: acc.score + curr.score })`)
- **nodeFunc** Optional character, a function to evaluate node. (default: `x => ({ score: x.score })`)
- **childFunc** Optional character, a function to get children nodes. (default: `x => x.children || []`)
- **option**
  - **toHold** Save the results to each node. (default: `false`)
```javascript
totalizer(({
  tree: [
    {
      a: 1,
      children: [{ score: 20 }, { score: 22 }, { children: [ { score: 10 } ] }]
    }
  ]
}))
//=> { score: 52 }
```

#### list2tree({ list, option })  - Create Tree from list items
- **list** An array item to tree.
- **option** 
  - **childrenField** The default children attribute. (default: `'children'`)
  - **parentFeild** The default parent attribute. (default: `'parent'`)
  - **idFeild** The default id attribute. (default: `'id'`)
```javascript
list2tree({ list: [
  { id: 12, a: 12 },
  { id: 13, a: 22, parent: 12 },
  { id: 14, a: 22, parent: 12 },
  { id: 15, a: 22, parent: 13 }
] })
//=> [{
//   "id": 12,
//   "a": 12,
//   "children": [
//     {
//       "id": 13,
//       "a": 22,
//       "parent": 12,
//       "children": [
//         {
//           "id": 15,
//           "a": 22,
//           "parent": 13,
//           "children": []
//         }
//       ]
//     },
//     {
//       "id": 14,
//       "a": 22,
//       "parent": 12,
//       "children": []
//     }
//   ]
// }]
```

#### tree2list({ tree, option })  - Create List items from tree
- **tree** An array tree to list.
- **option** 
  - **childrenField** The default children attribute. (default: `'children'`)
  - **parentFeild** The default parent attribute. (default: `'parent'`)
  - **idFeild** The default id attribute. (default: `'id'`)
```javascript
tree2list({
  tree: [{
    a: 12,
    children: [{
      b: 23,
      children: [{ c: 23 }]
    }, {
      d: 23
    }]
  }]
})
//=> [
//   { a: 12, id: '3rH5TqEQbSC0Luw0RAi2oc2MaVLEWgjy' },
//   { b: 23, parent: '3rH5TqEQbSC0Luw0RAi2oc2MaVLEWgjy', id: 'gJxvUcoSGhESpbvKAu9xhvYTqVWcL5SH' },
//   { c: 23, parent: 'gJxvUcoSGhESpbvKAu9xhvYTqVWcL5SH', id: 'rRCXTckJUXyq8GvcwmB0tKqQrnJeX1Va' },
//   { d: 23, parent: '3rH5TqEQbSC0Luw0RAi2oc2MaVLEWgjy', id: 'oe3Qi9yFq6Ts7guxguEtWw73INbGfRFa' }
// ]
```

#### searchNodes({ tree, filter, option })  - Search some matched nodes.
- **tree** An array tree to list.
- **option** 
  - **childrenField** The default children attribute. (default: `'children'`)
  - **parentFeild** The default parent attribute. (default: `'parent'`)
  - **idFeild** The default id attribute. (default: `'id'`)
```javascript
searchNodes({
  tree: [{
    a: 12,
    b: 23,
    children: [
      { a: 12, b: 23, children: [{ a: 12 }] }
    ]
  }],
  filter: x => {
    return x.a === 12
  }
})
//=> [
//   { a: 12, b: 23, id: 'bO8OfkKGdpkoYIPnX6Z3fMC490musJzM' },
//   { a: 12, b: 23, parent: 'bO8OfkKGdpkoYIPnX6Z3fMC490musJzM', id: 'ygkJRyzaRUfdKcMrsMhtrwTVC9VF3H7x' },
//   { a: 12, parent: 'ygkJRyzaRUfdKcMrsMhtrwTVC9VF3H7x', id: 'yNJOIvQR6SNKH5Qm8N3MeW9Pb6cPsI7E' }
// ]
```

#### searchNodeParents({ tree, filter, option })  - search some matched nodes parents
- **tree** An array tree to list.
- **filter** An function to filter node.
- **option** 
  - **childrenField** The default children attribute. (default: `'children'`)
  - **parentFeild** The default parent attribute. (default: `'parent'`)
  - **idFeild** The default id attribute. (default: `'id'`)
```javascript
searchNodeParents({
  tree: [{
    a: 12,
    b: 23,
    children: [
      { a: 12, b: 23, children: [{ a: 12, c: 6 }] }
    ]
  }],
  filter: x => {
    return x.c === 6
  }
})
//=> [
//   {
//     node:
//     {
//        a: 12,
//        c: 6,
//        parent: 'LmEkrlmuIPi9thQkH0GoIGRu8S4ramrH',
//        id: '5Y9VSlrUDZFQ3JgAbgKuhqGex2fIyyjh'
//     },
//     parents: [ [Object], [Object] ]
//   }
// ]
```

### Object Tools
#### compare({ target, source, diffBack, option })  - Compare document differences
- **target** An Object target to compare.
- **source** An Object source to compare.
- **diffBack** Optional character, a function that callback from diff result . (default: `x => x`)
- **option** 
  - **isType** The Types to compare. (default: `x => is.null(x) || is.undefined(x) || is.number(x) || is.boolean(x) || is.string(x) || is.date(x)`)
```javascript
compare({
  target: {
    a: 12,
    b: 3,
    d: {
      a: 12,
      b: 23,
      c: [1, 2]
    },
    c: [{ a: 23 }, { b: 4 }]
  },
  source: {
    a: 12,
    b: 34,
    d: {
      a: 23,
      b: 23,
      c: [3, 2]
    },
    c: [{ f: 23 }]
  }
})
//=> [
//   { path: 'b', target: 3, source: 34 },
//   { path: 'd.a', target: 12, source: 23 },
//   { path: 'd.c.[0]', target: 1, source: 3 },
//   { path: 'c.[0].a', target: 23, source: undefined },
//   { path: 'c.[1]', target: { b: 4 }, source: undefined }
// ]
```

### Memo Tools
#### memoize(func, option)  - Cache the results
- **func** An function to cache.
- **option** 
  - **iden** The same criteria. (default: `x => x`)
  - **timeBrake** The default parent attribute. (default: `10000`)
```javascript
const func = memoize(function (x) {
  console.log('chache = ', x)
  return x
}, { iden: x => x, timeBrake: 5000 })
func(12)
func(12)
//=> chache =  12
```
#### Lock  - synchrolock

The MIT License (MIT)

Copyright (c) 2018-2020 Double

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
