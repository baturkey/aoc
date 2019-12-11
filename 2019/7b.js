/* 1336480 */
let input = `3,8,1001,8,10,8,105,1,0,0,21,38,55,64,81,106,187,268,349,430,99999,3,9,101,2,9,9,1002,9,2,9,101,5,9,9,4,9,99,3,9,102,2,9,9,101,3,9,9,1002,9,4,9,4,9,99,3,9,102,2,9,9,4,9,99,3,9,1002,9,5,9,1001,9,4,9,102,4,9,9,4,9,99,3,9,102,2,9,9,1001,9,5,9,102,3,9,9,1001,9,4,9,102,5,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,99`;

function permute(a) {
    if(a.length == 1) {
	return [a];
    }

    const output = [];
    for(let i of permute(a.slice(1))) {
	for(let pos = 0; pos <= i.length; pos++) {
	    output.push(i.slice(0, pos).concat(a[0], i.slice(pos)));
	}
    }
    return output;
}

function execute(amp) {

    while (1) {
        while (amp.code[amp.pc].length < 5) {
            amp.code[amp.pc] = '0' + amp.code[amp.pc];
        }
        const opcode = amp.code[amp.pc].substring(3);
        const m = [];
        m[1] = parseInt(amp.code[amp.pc].substring(2, 3));
        m[2] = parseInt(amp.code[amp.pc].substring(1, 2));
        m[3] = parseInt(amp.code[amp.pc].substring(0, 1));

        const param = offset => parseInt(m[offset] ? amp.code[amp.pc + offset] : amp.code[amp.code[amp.pc + offset]]);

        if (1 == opcode) {
            amp.code[amp.code[amp.pc + 3]] = '' + (param(1) + param(2));
            amp.pc += 4;
        } else if (2 == opcode) {
            amp.code[amp.code[amp.pc + 3]] = '' + param(1) * param(2);
            amp.pc += 4;
        } else if (3 == opcode) {
            amp.code[amp.code[amp.pc + 1]] = amp.inputcounter ? amp.input : amp.phase;
            amp.inputcounter++;
            amp.pc += 2;
        } else if (4 == opcode) {
            amp.output = param(1);
            amp.pc += 2;
            break;
        } else if (5 == opcode) {
            if (param(1) != 0) {
                amp.pc = param(2);
            }
        } else if (6 == opcode) {
            if (param(1) == 0) {
                amp.pc = param(2);
            }
        } else if (7 == opcode) {
            amp.code[amp.code[amp.pc + 3]] = param(1) < param(2) ? 1 : 0;
            amp.pc += 4;
        } else if (8 == opcode) {
            amp.code[amp.code[amp.pc + 3]] = param(1) == param(2) ? 1 : 0;
            amp.pc += 4;
        } else if (99 == opcode) {
            amp.running = false;
            break;
        }
    }

    return amp;
}

function run(perm) {
    const amps = [0, 1, 2, 3, 4]
          .map(i => ({
              code: input.split(','),
              pc: 0,
              phase: perm[i],
              input: 0,
              inputcounter: 0,
              running: true,
          }));

    const isDone = amps => !amps.map(a => a.running).filter(a => a).length;

    let inp = 0;
    for (let cur = 0; !isDone(amps); cur = (cur + 1) % 5) {
        amps[cur].input = inp;
        amps[cur] = execute(amps[cur]);
        inp = amps[cur].output;
    }
    return inp;
}

console.log(Math.max(...permute([5, 6, 7, 8, 9]).map(run)));
