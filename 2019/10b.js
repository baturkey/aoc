/* 1321 */
let input = `.#..#..#..#...#..#...###....##.#....
.#.........#.#....#...........####.#
#..##.##.#....#...#.#....#..........
......###..#.#...............#.....#
......#......#....#..##....##.......
....................#..............#
..#....##...#.....#..#..........#..#
..#.#.....#..#..#..#.#....#.###.##.#
.........##.#..#.......#.........#..
.##..#..##....#.#...#.#.####.....#..
.##....#.#....#.......#......##....#
..#...#.#...##......#####..#......#.
##..#...#.....#...###..#..........#.
......##..#.##..#.....#.......##..#.
#..##..#..#.....#.#.####........#.#.
#......#..........###...#..#....##..
.......#...#....#.##.#..##......#...
.............##.......#.#.#..#...##.
..#..##...#...............#..#......
##....#...#.#....#..#.....##..##....
.#...##...........#..#..............
.............#....###...#.##....#.#.
#..#.#..#...#....#.....#............
....#.###....##....##...............
....#..........#..#..#.......#.#....
#..#....##.....#............#..#....
...##.............#...#.....#..###..
...#.......#........###.##..#..##.##
.#.##.#...##..#.#........#.....#....
#......#....#......#....###.#.....#.
......#.##......#...#.#.##.##...#...
..#...#.#........#....#...........#.
......#.##..#..#.....#......##..#...
..##.........#......#..##.#.#.......
.#....#..#....###..#....##..........
..............#....##...#.####...##.`;

function findAsteroids(map) {
    const asteroids = [];
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (map[y][x] === '#') {
                asteroids.push({x, y});
            }
        }
    }
    return asteroids;
}

function makeHash(asteroids) {
    const output = {};
    for (let asteroid of asteroids) {
        if (!(asteroid.x in output)) {
            output[asteroid.x] = {};
        }
        output[asteroid.x][asteroid.y] = true;
    }
    return output;
}

function scan(asteroid, _, list) {
    const found = {};
    const rest = list.filter(a => a.x != asteroid.x || a.y != asteroid.y);
    for (let r of rest) {
        for (let b of between(asteroid, r)) {
            if (asteroidHash[b[0]] && asteroidHash[b[0]][b[1]]) {
                if (!(b[0] in found)) {
                    found[b[0]] = {};
                }
                found[b[0]][b[1]] = true;
                break;
            }
        }
    }
    let count = 0;
    for (let k1 of Object.keys(found)) {
        for (let k2 of Object.keys(found[k1])) {
            count++;
        }
    }    
    return {asteroid, count};
}

function between(a1, a2) {
    const output = [];
    const getSlope = (a1, a2) => ({num: a1.y - a2.y,
                                   den: a1.x - a2.x});

    if (a1.x == a2.x) {
        if (a1.y < a2.y) {
            for (let y = a1.y + 1; y <= a2.y; y++) {
                output.push([a1.x, y]);
            }
        } else {
            for (let y = a1.y - 1; y >= a2.y; y--) {
                output.push([a1.x, y]);
            }
        }
    } else {
        const slope = getSlope(a1, a2);
        const yint_num = a1.y * slope.den - a1.x * slope.num;

        let xs = [];
        if (a1.x < a2.x) {
            for (let x = a1.x + 1; x <= a2.x; x++) {
                xs.push(x);
            }
        } else {
            for (let x = a1.x - 1; x >= a2.x; x--) {
                xs.push(x);
            }
        }
        for (let x of xs) {
            let num = slope.num * x + yint_num;
            if (num % slope.den == 0) {
                output.push([x, num / slope.den]);
            }
        }
    }
    return output;
}

function angleBetween(base, asteroid) {
    const xdiff = base.x - asteroid.x;
    const ydiff = base.y - asteroid.y;
    let ang = Math.atan(ydiff/xdiff) * 180 / Math.PI;;

    if (xdiff <= 0 && ydiff >= 0) {
        ang = Math.abs(ang);
    } else if (xdiff < 0 && ydiff <= 0) {
        ang = ang + 90;
    } else if (xdiff >= 0 && ydiff <= 0) {
        ang = ang + 270;
    } else {
        ang = Math.abs(ang) + 270;
    }

    return ang;
}

const map = input.split('\n').map(line => line.split(''));
const asteroids = findAsteroids(map);
const asteroidHash = makeHash(asteroids);
const base = asteroids.map(scan).reduce((a, b) => a.count > b.count ? a : b).asteroid;
const distance = a => Math.pow(a.x - base.x, 2) + Math.pow(a.y - base.y, 2);

const rest = asteroids.filter(a => a.x != base.x || a.y != base.y);

const asteroidAngles = rest.reduce((acc, r) => {
    const angle = angleBetween(base, r);
    
    if (!(angle in acc)) {
        acc[angle] = [];
    }
    acc[angle].push(r);
    acc[angle].sort((a, b) => distance(b) - distance(a));
    return acc;
}, {});

const angles = Object.keys(asteroidAngles).map(a => parseFloat(a)).sort((a, b) => a - b);

let count = 1;
let t;
for (let i = 0; count <= 200 ; i = (i + 1) % angles.length) {
    t = asteroidAngles[angles[i]].pop();
    count++;

    if (!asteroidAngles[angles[i].length]) {
        delete angles[i];
    }
}
console.log(t.x * 100 + t.y);
