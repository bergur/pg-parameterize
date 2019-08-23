"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe('toOrdinal', () => {
    test('should return original string when no ? parameter is found', () => {
        const sql = 'SELECT * FROM table WHERE field = value';
        const res = index_1.toOrdinal(sql);
        expect(res).toEqual(sql);
    });
    test('should replace ? wtesth $1', () => {
        const sql = 'SELECT * FROM table WHERE field = ?';
        const res = index_1.toOrdinal(sql);
        expect(res).toEqual('SELECT * FROM table WHERE field = $1');
    });
    test('should handle multiple occurances', () => {
        const sql = 'SELECT * FROM table WHERE field1 = ? OR field2 = ? AND field3 = ?';
        const res = index_1.toOrdinal(sql);
        expect(res).toEqual('SELECT * FROM table WHERE field1 = $1 OR field2 = $2 AND field3 = $3');
    });
});
describe('flatten', () => {
    test('should return empty array when given array is empty', () => {
        const arr = [];
        const res = index_1.flatten(arr);
        expect(res).toEqual([]);
    });
    test('should flatten array', () => {
        const arr = [
            ['John', 'A', 1],
            ['Jane', 'B', 2]
        ];
        const res = index_1.flatten(arr);
        expect(res).toEqual(['John', 'A', 1, 'Jane', 'B', 2]);
    });
});
describe('tuple', () => {
    test('should return empty string when given array is empty', () => {
        const arr = [];
        const res = index_1.toTuple(arr);
        expect(res).toEqual('');
    });
    test('should return tuple from array', () => {
        const arr = [
            ['John', 'A', 1],
            ['Jane', 'B', 2]
        ];
        const res = index_1.toTuple(arr);
        expect(res).toEqual('(?,?,?),(?,?,?)');
    });
    test('should return parametrized tuple from array', () => {
        const arr = [
            ['John', 'A', 1],
            ['Jane', 'B', 2]
        ];
        const res = index_1.toTuple(arr, true);
        expect(res).toEqual('($1,$2,$3),($4,$5,$6)');
    });
});
//# sourceMappingURL=test.js.map