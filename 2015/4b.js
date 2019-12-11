/* 9962624 */
const md5 = require('./md5');

const input = `yzbqklnj`;

let i = 0;
let output;

do {
    i++;
    let x = input + i;
    output = md5(x);
} while (!test(output));

console.log(i);

function test(inp) {
    for (let i = 0; i < 6; i++) {
        if (inp[i] != '0') {
            return false;
        }
    }
    return true;
}

