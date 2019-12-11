/* 329356 */
let input = `3113322113`;

function next(s) {
    let pos = 0;
    output = '';
    while (pos < s.length) {
        let counter = 0;
        let current = s[pos];
        while(s[pos] == current && pos < s.length) {
            counter++;
            pos++;
        }
        output += counter + s[pos - 1];
    }

    return output;
}

function repeat(f, arg, duration) {
    if (duration == 0) {
        return arg;
    }

    return repeat(f, f(arg), duration - 1);
}

console.log(repeat(next, input, 40).length);