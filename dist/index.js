"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toOrdinal(sqlString) {
    let index = 1;
    let ordinalString = sqlString;
    while (ordinalString.indexOf('?') !== -1) {
        ordinalString = ordinalString.replace('?', '$' + index);
        index++;
    }
    return ordinalString;
}
exports.toOrdinal = toOrdinal;
function flatten(arr) {
    return arr.reduce((flattened, item) => {
        item.forEach(value => {
            flattened.push(value);
        });
        return flattened;
    }, []);
}
exports.flatten = flatten;
function toTuple(arr, makeOrdinal) {
    const tuple = arr.map(item => {
        return '(' + item.map(_ => '?').join(',') + ')';
    }).join(',');
    if (!makeOrdinal) {
        return tuple;
    }
    else {
        return toOrdinal(tuple);
    }
}
exports.toTuple = toTuple;
exports.default = { toOrdinal, flatten, toTuple };
//# sourceMappingURL=index.js.map