# pg-parameterize
A small helper to parameterize your node-pg query when number of par
This can be helpful if you're creating your sql string dynamically

Since node-postgres has numerical paramters ($1, $2) and sometimes the number of paramters varies it can be cumbersome to build the sql string.
pg-paramterize reads ? and replaces them with correct numerical paramters.

## Example
```javascript
function simpleFind(options)
  let text = 'SElECT * FROM houses WHERE available = 1'
  const values = [];
  
  if (options.type) {
    sql += ' AND type = ?'
    params.push(options.type)
  }
  
  if (options.zipcode) {
    sql += ' AND zipcode = ?'
    params.push(options.type)
  }
  
  return client.query(text, values);
 }
 ```
