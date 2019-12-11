/* 1256 */
let input = `Vixen can fly 19 km/s for 7 seconds, but then must rest for 124 seconds.
Rudolph can fly 3 km/s for 15 seconds, but then must rest for 28 seconds.
Donner can fly 19 km/s for 9 seconds, but then must rest for 164 seconds.
Blitzen can fly 19 km/s for 9 seconds, but then must rest for 158 seconds.
Comet can fly 13 km/s for 7 seconds, but then must rest for 82 seconds.
Cupid can fly 25 km/s for 6 seconds, but then must rest for 145 seconds.
Dasher can fly 14 km/s for 3 seconds, but then must rest for 38 seconds.
Dancer can fly 3 km/s for 16 seconds, but then must rest for 37 seconds.
Prancer can fly 25 km/s for 6 seconds, but then must rest for 143 seconds.`;

//input = `Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
//Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.`;

function process(reindeer, line) {
    const parts = line.match(/^(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds.$/);
    reindeer[parts[1]] = {
        name: parts[1],
        speed: parseInt(parts[2]),
        time: parseInt(parts[3]),
        rest: parseInt(parts[4]),
        points: 0,
    }
    return reindeer;
}

function distance(deer, sec) {
    const period = deer.time + deer.rest;
    const remainder = sec % period;
    return {name: deer.name, distance: Math.floor(sec / period) * deer.speed * deer.time + deer.speed * (remainder > deer.time ? deer.time : remainder)};
}

const reindeer = input.split('\n').reduce(process, {});
for (let i = 1; i <= 2503; i++) {
    let a = Object.keys(reindeer).map(deer => distance(reindeer[deer], i)).sort((a, b) => b.distance - a.distance);
    const maxdistance = a[0].distance;
    a.forEach(b => {
        if (b.distance == maxdistance) {
            reindeer[b.name].points++;
        }
    });
}
console.log(Math.max(...Object.keys(reindeer).map(deer => reindeer[deer].points)));
