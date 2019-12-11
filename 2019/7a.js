/* 117312 */
let input = `3,8,1001,8,10,8,105,1,0,0,21,38,55,64,81,106,187,268,349,430,99999,3,9,101,2,9,9,1002,9,2,9,101,5,9,9,4,9,99,3,9,102,2,9,9,101,3,9,9,1002,9,4,9,4,9,99,3,9,102,2,9,9,4,9,99,3,9,1002,9,5,9,1001,9,4,9,102,4,9,9,4,9,99,3,9,102,2,9,9,1001,9,5,9,102,3,9,9,1001,9,4,9,102,5,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,99`;

//input = `3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0`;

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

function execute(pos, ip, phase, input, inputcounter) {
    let instruction = pos[ip];
    while (instruction.length < 5) {
        instruction = '0' + instruction;
    }
    const opcode = instruction.substring(3);
    const m = [];
    m[1] = parseInt(instruction.substring(2, 3));
    m[2] = parseInt(instruction.substring(1, 2));
    m[3] = parseInt(instruction.substring(0, 1));

    let length;

    function param(offset) {
        return parseInt(m[offset] ? pos[ip + offset] : pos[pos[ip + offset]]);
    }
    
    if (1 == opcode) {
        pos[pos[ip + 3]] = '' + (param(1) + param(2));
        length = 4;
    } else if (2 == opcode) {
        pos[pos[ip + 3]] = '' + param(1) * param(2);
        length = 4;
    } else if (3 == opcode) {
        pos[pos[ip + 1]] = inputcounter++ ? input : phase;
        length = 2;
    } else if (4 == opcode) {
        return param(1);
        length = 2;
    } else if (5 == opcode) {
        if (param(1) != 0) {
            ip = param(2) - 3;
        }
        length = 3;
    } else if (6 == opcode) {
        if (param(1) == 0) {
            ip = param(2) - 3;
        }
        length = 3;
    } else if (7 == opcode) {
        pos[pos[ip + 3]] = param(1) < param(2) ? 1 : 0;
        length = 4;
    } else if (8 == opcode) {
        pos[pos[ip + 3]] = param(1) == param(2) ? 1 : 0;
        length = 4;
    } else if (99 == opcode) {
        return 0;
    }

    return execute(pos, ip + length, phase, input, inputcounter);
}

console.log(Math.max(...permute([0, 1, 2, 3, 4]).map(perm => perm.reduce((acc, p) => execute(input.split(','), 0, p, acc, 0), 0))));
