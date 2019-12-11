/* 2660 */
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
        speed: parseInt(parts[2]),
        time: parseInt(parts[3]),
        rest: parseInt(parts[4]),
    }
    return reindeer;
}

function distance(deer, sec) {
    const period = deer.time + deer.rest;
    const whole = Math.floor(sec / period);
    const remainder = sec % period;
    let output = whole * deer.speed * deer.time;
    if (remainder > deer.time) {
        output += deer.speed * deer.time;
    } else {
        output += deer.speed * remainder;
    }
    return output;
}

const reindeer = input.split('\n').reduce(process, {});
console.log(Math.max(...Object.keys(reindeer).map(deer => distance(reindeer[deer], 2503))));
