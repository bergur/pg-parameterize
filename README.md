# pg-parameterize
A small helper to parameterize your [node-postgres](https://github.com/brianc/node-postgres) query when number of parameters varies.

pg-paramterize finds ? in  your string and replaces them with correct numerical paramters ($1, $2, etc)

```
SELECT * FROM table WHERE field = ?
```
becomes
```
SELECT * FROM table WHERE field = $1
```

This can be helpful if you're creating your sql string dynamically

## Example
```javascript
function simpleFind(options)
  let text = 'SElECT * FROM houses WHERE available = 1'
  const values = [];
  
  if (options.type) {
    sql += ' AND type = ?'
    values.push(options.type)
  }
  
  if (options.zipcode) {
    sql += ' AND zipcode = ?'
    values.push(options.type)
  }
  
  let q = parameterize(text);
  
  return client.query(text, values);
 }
 ```
