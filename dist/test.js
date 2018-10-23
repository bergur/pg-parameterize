"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const chai_1 = require("chai");
describe('toOrdinal', () => {
    it('should return original string when no ? parameter is found', () => {
        const sql = 'SELECT * FROM table WHERE field = value';
        const res = index_1.toOrdinal(sql);
        chai_1.expect(res).to.equal(sql);
    });
    it('should replace ? with $1', () => {
        const sql = 'SELECT * FROM table WHERE field = ?';
        const res = index_1.toOrdinal(sql);
        chai_1.expect(res).to.equal('SELECT * FROM table WHERE field = $1');
    });
    it('should handle multiple occurances', () => {
        const sql = 'SELECT * FROM table WHERE field1 = ? OR field2 = ? AND field3 = ?';
        const res = index_1.toOrdinal(sql);
        chai_1.expect(res).to.equal('SELECT * FROM table WHERE field1 = $1 OR field2 = $2 AND field3 = $3');
    });
});
describe('flatten', () => {
    it('should return empty array when given array is empty', () => {
        const arr = [];
        const res = index_1.flatten(arr);
        chai_1.expect(res).to.eql([]);
    });
    it('should flatten array', () => {
        const arr = [
            ['John', 'A', 1],
            ['Jane', 'B', 2]
        ];
        const res = index_1.flatten(arr);
        chai_1.expect(res).to.eql(['John', 'A', 1, 'Jane', 'B', 2]);
    });
});
describe('tuple', () => {
    it('should return empty string when given array is empty', () => {
        const arr = [];
        const res = index_1.toTuple(arr);
        chai_1.expect(res).to.eql('');
    });
    it.skip('should return tuple frome single array', () => {
        const arr = ['John', 'A', 1];
        const res = index_1.toTuple(arr);
        chai_1.expect(res).to.eql('(?,?,?)');
    });
    it('should return tuple from array', () => {
        const arr = [
            ['John', 'A', 1],
            ['Jane', 'B', 2]
        ];
        const res = index_1.toTuple(arr);
        chai_1.expect(res).to.equal('(?,?,?),(?,?,?)');
    });
    it('should return parametrized tuple from array', () => {
        const arr = [
            ['John', 'A', 1],
            ['Jane', 'B', 2]
        ];
        const res = index_1.toTuple(arr, true);
        chai_1.expect(res).to.eql('($1,$2,$3),($4,$5,$6)');
    });
});
//# sourceMappingURL=test.js.map