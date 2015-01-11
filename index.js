var Array2d = require('array-2d');

function match(what, where) {
    if (!regularMatch(what, where))
        return 0;
    return dynmatch(what, where)
}

module.exports = match;

function regularMatch(what, where) {
    var i = 0, j, m = what.length, n = where.length;
    for (j = 0; j < n; ++j)
        if (eqcase(where.charCodeAt(j), what.charCodeAt(i)))
            if (++i >= m) return true;
    return false;
}

function dynmatch(what, where) {
    var a = what, b = where;
    var m = a.length, n = b.length;
    var C = new Array2d(m + 1, n + 1, 0);
    for (var i = 0; i < m; i++)
        for (var j = 0; j < n; j++)
            C.set(i+1, j+1, max3(C.get(i, j) + gain(a,b,i,j),
                                 C.get(i+1, j),
                                 C.get(i, j+1)));
    return C.get(m, n) - min2(n, 999) / 1000; // second factor is length
}

function eqcase(a, b) {
    return a === b ||
        (Math.abs(a - b) == 32 &&
         isLatinLetter(a) &&
         isLatinLetter(b))
}

var Gain = {
    Beginning: 3,
    TwoOrMore: 2,
    Normal: 1
}

function gain(a, b, i, j) {
    var ai = a.charCodeAt(i), bj = b.charCodeAt(j)
    if (!eqcase(ai, bj)) return 0;
    if (j === 0)
        return Gain.Beginning;
    if (isUpper(bj))
        return Gain.Beginning;
    var lookBehind = b.charCodeAt(j - 1)
    if (isSeparator(lookBehind))
        return Gain.Beginning;
    if (i > 0 && eqcase(a.charCodeAt(i-1), lookBehind))
        return Gain.TwoOrMore
    return 1;
}

function isLatinLetter(code) {
    return (code >= 97 && code <= 122) ||
        (code >= 65 && code <= 90);
}

function isUpper(code) {
    return (code >= 65 && code <= 90)
}

function isSeparator(code) {
    return (code >= 45 && code <= 47) ||
        (code === 95) || // underscore
        (code === 32) // space
}

function max3(a, b, c) {
    if (a > b) {
        if (a > c) return a;
        return c;
    }
    if (b > c) return b;
    return c;
}

function min2(a, b) {
    if (a < b) return a;
    return b;
}
