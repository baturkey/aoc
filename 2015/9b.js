/* 736 */
let input = `AlphaCentauri to Snowdin = 66
AlphaCentauri to Tambi = 28
AlphaCentauri to Faerun = 60
AlphaCentauri to Norrath = 34
AlphaCentauri to Straylight = 34
AlphaCentauri to Tristram = 3
AlphaCentauri to Arbre = 108
Snowdin to Tambi = 22
Snowdin to Faerun = 12
Snowdin to Norrath = 91
Snowdin to Straylight = 121
Snowdin to Tristram = 111
Snowdin to Arbre = 71
Tambi to Faerun = 39
Tambi to Norrath = 113
Tambi to Straylight = 130
Tambi to Tristram = 35
Tambi to Arbre = 40
Faerun to Norrath = 63
Faerun to Straylight = 21
Faerun to Tristram = 57
Faerun to Arbre = 83
Norrath to Straylight = 9
Norrath to Tristram = 50
Norrath to Arbre = 60
Straylight to Tristram = 27
Straylight to Arbre = 81
Tristram to Arbre = 90`;

function parse(s) {
    const parts = s.split(' = ');
    return parts[0].split(' to ').concat(parseInt(parts[1]));
}

function populate(a) {
    if (!(a[0] in nodes)) {
        nodes[a[0]] = {};
    }
    if (!(a[1] in nodes)) {
        nodes[a[1]] = {};
    }
    nodes[a[0]][a[1]] = a[2];
    nodes[a[1]][a[0]] = a[2];
}

function permute(a) {
    var output = [];
    if(a.length == 1) {
	return [a];
    }
    for(var i of permute(a.slice(1))) {
	for(var pos = 0; pos <= i.length; pos++) {
	    output.push(i.slice(0, pos).concat(a[0], i.slice(pos)));
	}
    }
    return output;
}

function calculate(a) {
    let total = 0;
    for (let city = a[0], i = 1; i < a.length; i++) {
        total += nodes[city][a[i]];
        city = a[i];
    }
    return total;
}

const nodes = {};
input.split('\n').map(parse).forEach(populate);
console.log(Math.max(...permute(Object.keys(nodes)).map(calculate)));
