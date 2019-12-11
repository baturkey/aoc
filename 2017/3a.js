const input = 265149;

const test = 14;

function odd(n) {
    return 2 * n + 1;
}

function oddSquare(n) {
    return Math.pow(odd(n), 2)
}
let i = 1;
while (oddSquare(i) < test) {
    i++;
}

console.log(i, odd(i), oddSquare(i - 1));
