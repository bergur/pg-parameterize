
'use strict';
const ordinal = function(string) {
    
    let index = 1;
    while(string.indexOf('?') !== -1) {
        string = string.replace('?','$'+index);
        index++;
    }

    return string;
}

const flatten = function(arr) {
    return arr.reduce(function(flattened,item) {
        item.forEach(function(value) {
            flattened.push(value);
        });
        
        return flattened;
    },[])
}

const tuple = function(arr, makeOrdinal) {
    const tuple = arr.map(function(item) {        
	    return '(' + item.map(value => '?').join(',') +')';
    }).join(',');
    
    if (!makeOrdinal) {
        return tuple;
    } else {                
        return ordinal(tuple);        
    }
}

exports.ordinal = ordinal;
exports.flatten = flatten;
exports.tuple = tuple;
