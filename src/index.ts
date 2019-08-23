
export function toOrdinal (sqlString: string): string {
  let index = 1
  let ordinalString = sqlString
  while (ordinalString.indexOf('?') !== -1) {
    ordinalString = ordinalString.replace('?','$' + index)
    index++
  }

  return ordinalString
}

export function flatten (arr: any[]): string {
  return arr.reduce((flattened,item) => {
    item.forEach(value => {
      flattened.push(value)
    })

    return flattened
  },[])
}

export function toTuple (arr: any[], makeOrdinal?: boolean): string {
  const tuple = arr.map(item => {
    return '(' + item.map(_ => '?').join(',') + ')'
  }).join(',')

  if (!makeOrdinal) {
    return tuple
  } else {
    return toOrdinal(tuple)
  }
}

export default { toOrdinal, flatten, toTuple }
