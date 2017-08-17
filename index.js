
const parameterize = function(string) {
    
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

const tuple = function(arr, parameterize) {
    const tuple = arr.map(function(item) {        
	    return '(' + item.map(value => '?').join(',') +')';
    }).join(',');
    
    if (!parameterize) {
        return tuple;
    } else {                
        return this.parameterize(tuple);        
    }
}

exports.parameterize = parameterize;
exports.flatten = flatten;
exports.tuple = tuple;
