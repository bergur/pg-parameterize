import { toOrdinal, flatten, toTuple } from './index'
import { expect } from 'chai'

describe('toOrdinal', () => {        
  it('should return original string when no ? parameter is found', () => {
    const sql = 'SELECT * FROM table WHERE field = value'
    const res = toOrdinal(sql)
    expect(res).to.equal(sql)
  })

  it('should replace ? with $1', () => {
    const sql = 'SELECT * FROM table WHERE field = ?'
    const res = toOrdinal(sql)
    expect(res).to.equal('SELECT * FROM table WHERE field = $1')
  })

  it('should handle multiple occurances', () => {
    const sql = 'SELECT * FROM table WHERE field1 = ? OR field2 = ? AND field3 = ?'
    const res = toOrdinal(sql)
    expect(res).to.equal('SELECT * FROM table WHERE field1 = $1 OR field2 = $2 AND field3 = $3')
  })
})

describe('flatten', () => {
  it('should return empty array when given array is empty', () => {
    const arr = []
    const res = flatten(arr)
    expect(res).to.eql([])
  })

  it('should flatten array', () => {
    const arr = [
      ['John','A',1],
      ['Jane','B',2]
    ]

    const res = flatten(arr)
    expect(res).to.eql(['John', 'A', 1, 'Jane', 'B', 2])
  })
})

describe('tuple', () => {
  it('should return empty string when given array is empty', () => {
    const arr = []
    const res = toTuple(arr)
    expect(res).to.eql('')
  })

  it.skip('should return tuple frome single array', () => {
    const arr = ['John','A',1]
    const res = toTuple(arr)
    expect(res).to.eql('(?,?,?)')
  })

  it('should return tuple from array', () => {
    const arr = [
      ['John','A',1],
      ['Jane','B',2]
    ]

    const res = toTuple(arr)
    expect(res).to.equal('(?,?,?),(?,?,?)')
  })

  it('should return parametrized tuple from array', () => {
    const arr = [
      ['John','A',1],
      ['Jane','B',2]
    ]

    const res = toTuple(arr, true)
    expect(res).to.eql('($1,$2,$3),($4,$5,$6)')
  })
})
