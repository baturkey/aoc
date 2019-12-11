/* hxbxxyzz */
let input = `hxbxwxba`;

// a:  97
function next(s) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let output = s.split('');
    let i = s.length - 1;
    let carry = false;
    do {
        let n = s.charCodeAt(i) - 97;
        output[i] = alphabet[(n + 1) % 26];
        carry = n != 25;
        i--;
    } while (!carry);
    return output.join('');
}

function increasing(s) {
    for (let i = 0; i < s.length - 2; i++) {
        if (s.charCodeAt(i) + 1 == s.charCodeAt(i+1) && s.charCodeAt(i) + 2 == s.charCodeAt(i + 2)) {
            return true;
        }
    }
    return false;
}

function noillegal(s) {
    if(s.includes('i') || s.includes('o') || s.includes('l')) {
        return false;
    }
    return true;
}

function pairs(s) {
    let pairs = {};
    for (let i = 0; i < s.length - 1; i++) {
        if (s[i] == s[i+1]) {
            pairs[s[i]] = true;
        }
    }
    return Object.keys(pairs).length > 1;
}

function valid(s) {
    return increasing(s) && noillegal(s) && pairs(s);
}

function filter(s) {
    let output = next(s);
    while (!valid(output)) {
        output = next(output);
    }
    return output;
}

console.log(filter(input));
