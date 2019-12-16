/* 7928 */
const input = `<x=5, y=-1, z=5>
<x=0, y=-14, z=2>
<x=16, y=4, z=0>
<x=18, y=1, z=16>`;

const axes = ['x', 'y', 'z'];

const process = line =>
      line.slice(1, -1).split(', ').reduce((moon, prop) => {
          const [key, val] = prop.split('=');
          moon.pos[key] = parseInt(val);
          return moon;
      }, {pos: {x: 0, y: 0, z: 0},
          vel: {x: 0, y: 0, z: 0}});

function step(system) {
    const newsystem = [];

    while (system.length) {
        const moon1 = system.pop();
        system.forEach(moon2 => {
            axes.forEach(axis => {
                if (moon1.pos[axis] > moon2.pos[axis]) {
                    moon1.vel[axis]--;
                    moon2.vel[axis]++;
                } else if(moon1.pos[axis] < moon2.pos[axis]) {
                    moon1.vel[axis]++;
                    moon2.vel[axis]--;
                }
            });
        });
        axes.forEach(axis => moon1.pos[axis] += moon1.vel[axis]);
        newsystem.unshift(moon1);
    }

    return newsystem;
}

const repeat = (f, arg, times) => times ? repeat(f, f(arg), times - 1) : arg;

const energy = system => system
      .map(moon => ['pos', 'vel']
           .map(prop => axes
                .map(axis => Math.abs(moon[prop][axis]))
                .reduce((a, b) => a + b))
           .reduce((a, b) => a * b))
      .reduce((a, b) => a + b);

console.log(energy(repeat(step, input.split('\n').map(process), 1000)));
