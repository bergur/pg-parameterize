# pg-parameterize
A small helper to parameterize your node-pg query when number of paramters varies.

This can be helpful if you're creating your sql string dynamically

pg-paramterize finds ? in  your string and replaces them with correct numerical paramters ($1, $2, etc)

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
