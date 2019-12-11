/* 276 */
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

// input = `.#..#
// .....
// #####
// ....#
// ...##`;

/*
.7..7
.....
67775
....7
...87
*/

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
        const btwn = between(asteroid, r);
        for (let b of btwn) {
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
    
    return count;
}

const getSlope = (a1, a2) => ({num: a1.y - a2.y,
                               den: a1.x - a2.x});

function between(a1, a2) {
    const output = [];

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

const map = input.split('\n').map(line => line.split(''));
const asteroids = findAsteroids(map);
//console.log(asteroids);
const asteroidHash = makeHash(asteroids);
const f = asteroids.map(scan);
console.log(Math.max(...f));




//console.log(between({x: 4, y: 2}, {x: 1, y: 0}));

//scan(asteroids[6], 0, asteroids);

//console.log(asteroids);

//console.log(asteroids[0], asteroids[2], between(asteroids[0], asteroids[2]));

//const origin = {x: 0, y: 0};

//console.log(between({x: 0, y: -10}, origin));

function makeLine(x1, y1, x2, y2) {
    const m = (y2 - y1) / (x2 - x1);
    const b = y1 - x1 * m;
    console.log(`(${x1}, ${y1}), (${x2}, ${y2}), y=${m}x + ${b}`);
}

//makeLine(1, 0, 0, 2);
