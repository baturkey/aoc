/* 1145 */
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

function hasOnlyDoubles(a) {
    let pos = 0;
    
    while (pos < 6) {
        let counter = 0;
        let current = a[pos];
        while(a[pos] == current && pos < 6) {
            counter++;
            pos++;
        }
        if (counter == 2) {
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
    if (hasOnlyDoubles(a) && alwaysIncreasing(a)) {
        counter++;
    }
}
console.log(counter);
