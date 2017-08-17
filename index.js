module.exports = exports = parameterize = function(string) {
    const arr = string.split('?');

    if (arr.length === 1) {
        return string;
    } else {
        arr.pop();
        return arr.reduce(function(newString, queryPart, index) {
            return newString + queryPart + '$' +(index+1);
        },'');
    }    
}