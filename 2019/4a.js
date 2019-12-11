/* 1686 */
const start = 168630;
const end = 718098;

function convert(n) {
    var output = [];
    while(n > 0) {
	output.unshift(n % 10);
	n = Math.floor(n / 10);
    }
    return output;
}

function hasDouble(a) {
    for (let i = 0; i < 5; i++) {
        if (a[i] == a[i+1]) {
            return true;
        }
    }
    return false;
}

function alwaysIncreasing(a) {
    for (let i = 0; i < 5; i++) {
        if (a[i+1] < a[i]) {
            return false;
        }
    }
    return true;
}

let counter = 0;
for (let n = start; n <= end; n++) {
    let a = convert(n);
    if (hasDouble(a) && alwaysIncreasing(a)) {
        counter++;
    }
}

console.log(counter);
