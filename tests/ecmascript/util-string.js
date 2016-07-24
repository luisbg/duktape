/* Trivial string checksum used to summarize brute force output lines
 * (minimizes test case size).
 */
function checksumString(x) {
    var i, n;
    var res = 0;
    var mult = [ 1, 3, 5, 7, 11, 13, 17, 19, 23 ];

    n = x.length;
    for (i = 0; i < n; i++) {
        res += x.charCodeAt(i) * mult[i % mult.length];
        res = res >>> 0;  // coerce to 32 bits
    }

    return res;
}

// Number to string, preserve negative zero sign.
function numberToString(v) {
    if (v !== 0) { return String(v); }
    return (1 / v > 0) ? '0' : '-0';
}

// Escape a string with codepoint escaping.
function safeEscapeString(s) {
    var tmp = [];
    var i, c;

    for (i = 0; i < s.length; i++) {
        // When CESU-8 / extended UTF-8 decoding fails, Duktape currently throws
        // for charCodeAt().
        try {
            c = s.charCodeAt(i);
            if (c < 0x20 || c > 0x7e || c == '<' || c == '>' || c == '"' || c == '\'') {
                tmp.push('<U+' + (('0000') + c.toString(16)).substr(-4).toUpperCase() + '>');
            } else {
                tmp.push(String.fromCharCode(c));
            }
        } catch (e) {
            tmp.push('<' + e.name + '>');
        }
    }

    return '"' + tmp.join('') + '"'
}

function safePrintString(s) {
    print(safeEscapeString(s));
}
