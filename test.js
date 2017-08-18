'use strict';
const parameterize = require('./index');
const expect = require('chai').expect;

describe('ordinal', function() {
    it('should return original string when no ? parameter is found', function() {
        const string = 'SELECT * FROM table WHERE field = value';
        const res = parameterize.ordinal(string);
        expect(res).to.equal(string);
    })

    it('should replace ? with $1', function() {
        const string = 'SELECT * FROM table WHERE field = ?';        
        const res = parameterize.ordinal(string);
        expect(res).to.equal('SELECT * FROM table WHERE field = $1');
    })

    it('should handle multiple occurances', function() {
        const string = 'SELECT * FROM table WHERE field1 = ? OR field2 = ? AND field3 = ?';
        const res = parameterize.ordinal(string);
        expect(res).to.equal('SELECT * FROM table WHERE field1 = $1 OR field2 = $2 AND field3 = $3');
    })
})

describe('flatten', function() {
    it('should return empty array when given array is empty', function() {
        const arr = [];
        const res = parameterize.flatten(arr);
        expect(res).to.eql([]);
    })

    it('should flatten array', function() {
        const arr = [
    	    ['John','A',1],
            ['Jane','B',2],
        ];

        const res = parameterize.flatten(arr);
        expect(res).to.eql(['John', 'A', 1, 'Jane', 'B', 2]);
    })
})

describe('tuple', function() {    
    it('should return empty string when given array is empty', function() {
        const arr = [];
        const res = parameterize.tuple(arr);
        expect(res).to.eql('');
    });

    it.skip('should return tuple frome single array', function() {
        const arr = ['John','A',1];
        const res = parameterize.tuple(arr);
        expect(res).to.eql('(?,?,?)');
    });

    it('should return tuple from array', function() {
        const arr = [
            ['John','A',1],
            ['Jane','B',2]
        ];

        const res = parameterize.tuple(arr);
        expect(res).to.equal('(?,?,?),(?,?,?)');
    });    

    it('should return parameterized tuple from array', function() {
        const arr = [
            ['John','A',1],
            ['Jane','B',2]
        ];

        const res = parameterize.tuple(arr, true);        
        expect(res).to.eql('($1,$2,$3),($4,$5,$6)');
    });  
})