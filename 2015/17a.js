/* 5372 */
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

function combinations(qty, containers, history) {
    const newhistory = [containers[0]].concat(history);
    
    if (containers.length == 0 || containers[0] > qty) {
        return 0;
    }
    if (containers[0] == qty) {
        return 1 + combinations(qty, containers.slice(1), history);
    } 
    return combinations(qty, containers.slice(1), history) + combinations(qty - containers[0], containers.slice(1), newhistory);
}

console.log(combinations(150, input.split('\n').map(a => parseInt(a)).sort((a, b) => a - b), []));
