/* 4 */
const input = `11
30
47
31
32
36
3
1
5
3
32
36
15
11
46
26
28
1
19
3`;

const c = [];

function combinations(qty, containers, history) {
    const newhistory = [containers[0]].concat(history);
    
    if (containers.length == 0 || containers[0] > qty) {
        return 0;
    }
    if (containers[0] == qty) {
        c.push(history);
        return 1 + combinations(qty, containers.slice(1), history);
    } 
    return combinations(qty, containers.slice(1), history) + combinations(qty - containers[0], containers.slice(1), newhistory);
}

combinations(150, input.split('\n').map(a => parseInt(a)).sort((a, b) => a - b), []);

const o = c.reduce((output, cur) => {
    if (!(cur.length in output)) {
        output[cur.length] = 0;
    }
    output[cur.length]++;
    return output;
}, {})

console.log(o[Object.keys(o).map(a => parseInt(a)).sort((a, b) => a - b)[0]]);
