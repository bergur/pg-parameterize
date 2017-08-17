const parameterize = require('./index');
const expect = require('chai').expect;

describe('pg-parameterize', function() {
    it('should return original string when no ? parameter is found', function() {
        const string = 'SELECT * FROM table WHERE field = value';
        const p = parameterize(string);
        expect(p).to.equal(string);
    })

    it('should replace ? with $1', function() {
        const string = 'SELECT * FROM table WHERE field = ?';        
        const p = parameterize(string);
        expect(p).to.equal('SELECT * FROM table WHERE field = $1');
    })

    it('should handle multiple occurances', function() {
        const string = 'SELECT * FROM table WHERE field1 = ? OR field2 = ? AND field3 = ?';
        const p = parameterize(string);
        expect(p).to.equal('SELECT * FROM table WHERE field1 = $1 OR field2 = $2 AND field3 = $3');
    })
})