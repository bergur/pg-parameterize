# pg-parameterize

<span class="badge-npmversion"><a href="https://npmjs.org/package/pg-parameterize" title="View this project on NPM"><img src="https://img.shields.io/npm/v/pg-parameterize.svg" alt="NPM version" /></a></span>

A small helper for [node-postgres](https://github.com/brianc/node-postgres) to help you with building your queries.

Building dynamic queries can be tricky since node-postgres uses ordinal paramters ($1, $2, etc). That means that the parameter has a numerical value so there's a clear ordering of the variables. This module just modifies strings and arrays so it's easier to create SQL statements for the node-postgres query.

## ordinal(string)
This functions finds ? in  your string and replaces them with correct ordinal paramters.

```
SELECT * FROM table WHERE field1 = ? AND field2 = ?
```
becomes
```
SELECT * FROM table WHERE field = $1 AND field = $2
```

This can be helpful if you're creating your sql string dynamically:

### Example
```javascript
function simpleFind(options)
  let sql = 'SElECT * FROM houses WHERE available = 1'
  const values = [];
  
  if (options.type) {
    sql += ' AND type = ?'
    values.push(options.type)
  }
  
  if (options.zipcode) {
    sql += ' AND zipcode = ?'
    values.push(options.type)
  }
  
  const sqlOrdinal = ordinal(sql);
  
  return pool.query(sqlOrdinal, values);
 }
 ```

## tuple(array,ordinal)
This functions creates a tuples of ? or $1, $2 from a array of values depending on if the ordinal parameter is set or not.

```
const arr = [
  ['Flat','AB123',1]  
]
```
becomes
```
(?,?,?) // ordinal = false
OR
($1,$2,$3) // ordinal = true
```

This can be helpful if you want to create a insert statement
### Example
```javascript
function insert() {
  const array = [
    ['Flat','AB123',1]    
  ];
  const tuples = tuple(array,true);
  // ($1,$2,$3)
  const sql = 'INSERT INTO Houses(type,zipcode,available) VALUES'+ tuples ;
  // INSERT INTO Houses(type,zipcode,available) VALUES ($1,$2,$3)  
  const values = array[0];
  // ['Flat','AB123',1]
  return pool.query(sql values);
```

## flatten(array)
This function flattens an array so you can pass it in the query as a value-array.

```
const arr = [
  ['Flat','AB123',1],
  ['Castle,'CD456',1]
]
```
becomes
```
 ['Flat','AB123',1,'Castle,'CD456',1]
```

This can be helpful if you want to create a insert statement
### Example
```javascript
function insert() {
  const array = [
    ['Flat','AB123',1],
    ['Castle','CD456',1]
  ];

  const tuples = tuple(array,true);
  // ($1,$2,$3),($4,$5,$6)
  const sql = 'INSERT INTO Houses(type,zipcode,available) VALUES'+ tuple(values,true);
  // INSERT INTO Houses(type,zipcode,available) VALUES ($1,$2,$3),($4,$5,$6)
  const values = flatten(array)
  // ['Flat','AB123',1,'Castle,'CD456',1]
  return pool.query(sql,values);
}