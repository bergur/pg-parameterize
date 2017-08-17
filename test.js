const queryHelper = require('./index');
const expect = require('chai').expect;

describe('parameterize', function() {
    it('should return original string when no ? parameter is found', function() {
        const string = 'SELECT * FROM table WHERE field = value';
        const res = queryHelper.parameterize(string);
        expect(res).to.equal(string);
    })

    it('should replace ? with $1', function() {
        const string = 'SELECT * FROM table WHERE field = ?';        
        const res = queryHelper.parameterize(string);
        expect(res).to.equal('SELECT * FROM table WHERE field = $1');
    })

    it('should handle multiple occurances', function() {
        const string = 'SELECT * FROM table WHERE field1 = ? OR field2 = ? AND field3 = ?';
        const res = queryHelper.parameterize(string);
        expect(res).to.equal('SELECT * FROM table WHERE field1 = $1 OR field2 = $2 AND field3 = $3');
    })
})

describe('flatten', function() {
    it('should return empty array when given array is empty', function() {
        const arr = [];
        const res = queryHelper.flatten(arr);
        expect(res).to.eql([]);
    })

    it('should flatten array', function() {
        const arr = [
    	    ['John','A',1],
            ['Jane','B',2],
        ];

        const res = queryHelper.flatten(arr);
        expect(res).to.eql(['John', 'A', 1, 'Jane', 'B', 2]);
    })
})

describe('tuple', function() {    
    it('should return empty string when given array is empty', function() {
        const arr = [];
        const res = queryHelper.tuple(arr);
        expect(res).to.eql('');
    });

    it('should return tuple from array', function() {
        const arr = [
            ['John','A',1],
            ['Jane','B',2]
        ];

        const res = queryHelper.tuple(arr);
        expect(res).to.equal('(?,?,?),(?,?,?)');
    });    

    it('should return parameterized tuple from array', function() {
        const arr = [
            ['John','A',1],
            ['Jane','B',2]
        ];

        const res = queryHelper.tuple(arr, true);        
        expect(res).to.eql('($1,$2,$3),($4,$5,$6)');
    });  
})