
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

const tuple = function(arr, ordinal) {
    const tuple = arr.map(function(item) {        
	    return '(' + item.map(value => '?').join(',') +')';
    }).join(',');
    
    if (!ordinal) {
        return tuple;
    } else {                
        return this.ordinal(tuple);        
    }
}

exports.ordinal = ordinal;
exports.flatten = flatten;
exports.tuple = tuple;
