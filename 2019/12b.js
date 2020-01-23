/* 518311327635164 */
const input = `<x=5, y=-1, z=5>
<x=0, y=-14, z=2>
<x=16, y=4, z=0>
<x=18, y=1, z=16>`;

const parse = line =>
      line.slice(1, -1).split(', ').reduce((moon, prop) => {
          const [key, val] = prop.split('=');
          moon.pos[key] = parseInt(val);
          return moon;
      }, {pos: {x: 0, y: 0, z: 0},
          vel: {x: 0, y: 0, z: 0}});

function gen(sys) {
    const output = []
    for (let idx = 0; idx < 24; idx++) {
            output.push(`sys[${idx}] == ${sys[idx]}`);
    }
    return output.join(' && ');
}

function gcd(a, b) {
    const greater = a > b ? a : b;
    const lesser = a <= b ? a : b;

    const remainder = a % b;
    if (remainder == 0) {
        return b;
    } else {
        return gcd(b, remainder);
    }
}

function cycler(a, b) {
    const g = gcd(a, b);
    return a * b / g;
}

const system = input.split('\n').map(parse);
const sys = ['pos', 'vel'].map(prop => ['x', 'y', 'z'].map(axis => system.map(moon => moon[prop][axis])).reduce((a, b) => a.concat(b))).reduce((a, b) => a.concat(b));

let foundX = false;
let foundY = false;
let foundZ = false;

const cmp = (a, b) => a == b ? 0 : (a > b ? 1 : -1);

for (let i = 0; !foundX || !foundY || !foundZ; i++) {

    sys[12] += cmp(sys[1], sys[0]) + cmp(sys[2], sys[0]) + cmp(sys[3], sys[0]);
    sys[13] += cmp(sys[0], sys[1]) + cmp(sys[2], sys[1]) + cmp(sys[3], sys[1]);
    sys[14] += cmp(sys[0], sys[2]) + cmp(sys[1], sys[2]) + cmp(sys[3], sys[2]);
    sys[15] += cmp(sys[0], sys[3]) + cmp(sys[1], sys[3]) + cmp(sys[2], sys[3]);

    sys[0] += sys[12];
    sys[1] += sys[13];
    sys[2] += sys[14];
    sys[3] += sys[15];

    sys[16] += cmp(sys[5], sys[4]) + cmp(sys[6], sys[4]) + cmp(sys[7], sys[4]);
    sys[17] += cmp(sys[4], sys[5]) + cmp(sys[6], sys[5]) + cmp(sys[7], sys[5]);
    sys[18] += cmp(sys[4], sys[6]) + cmp(sys[5], sys[6]) + cmp(sys[7], sys[6]);
    sys[19] += cmp(sys[4], sys[7]) + cmp(sys[5], sys[7]) + cmp(sys[6], sys[7]);

    sys[4] += sys[16];
    sys[5] += sys[17];
    sys[6] += sys[18];
    sys[7] += sys[19];

    sys[20] += cmp(sys[9], sys[8]) + cmp(sys[10], sys[8]) + cmp(sys[11], sys[8]);
    sys[21] += cmp(sys[8], sys[9]) + cmp(sys[10], sys[9]) + cmp(sys[11], sys[9]);
    sys[22] += cmp(sys[8], sys[10]) + cmp(sys[9], sys[10]) + cmp(sys[11], sys[10]);
    sys[23] += cmp(sys[8], sys[11]) + cmp(sys[9], sys[11]) + cmp(sys[10], sys[11]);

    sys[8] += sys[20];
    sys[9] += sys[21];
    sys[10] += sys[22];
    sys[11] += sys[23];
    
    if (!foundX && sys[0] == 5 && sys[1] == 0 && sys[2] == 16 && sys[3] == 18 && sys[12] == 0 && sys[13] == 0 && sys[14] == 0 && sys[15] == 0) {
        foundX = i + 1;
    }

    if (!foundY && sys[4] == -1 && sys[5] == -14 && sys[6] == 4 && sys[7] == 1 && sys[16] == 0 && sys[17] == 0 && sys[18] == 0 && sys[19] == 0) {
        foundY = i + 1;
    }

    if (!foundZ && sys[8] == 5 && sys[9] == 2 && sys[10] == 0 && sys[11] == 16 && sys[20] == 0 && sys[21] == 0 && sys[22] == 0 && sys[23] == 0) {
        foundZ = i + 1;
    }
}

console.log(cycler(foundX, cycler(foundY, foundZ)));
