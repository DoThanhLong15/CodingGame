const movRegister = (instruction, register) => {
    let dest = instruction[1];
    let value = instruction[2];

    if (Number.isInteger(parseInt(value))) {
        register[dest] = parseInt(value);
    }
    else {
        register[dest] = register[value];
    }
}

const addInstruction = (instruction, register) => {
    let dest = instruction[1];
    let value1 = instruction[2];
    let value2 = instruction[3];

    value1 = Number.isInteger(parseInt(value1)) ? parseInt(value1) : register[value1];
    value2 = Number.isInteger(parseInt(value2)) ? parseInt(value2) : register[value2];

    register[dest] = value1 + value2;
}

const subInstruction = (instruction, register) => {
    let dest = instruction[1];
    let value1 = instruction[2];
    let value2 = instruction[3];

    value1 = Number.isInteger(parseInt(value1)) ? parseInt(value1) : register[value1];
    value2 = Number.isInteger(parseInt(value2)) ? parseInt(value2) : register[value2];

    register[dest] = value1 - value2;
}

var inputs = readline().split(' ');

const register = {
    "a": parseInt(inputs[0]),
    "b": parseInt(inputs[1]),
    "c": parseInt(inputs[2]),
    "d": parseInt(inputs[3])
}
const n = parseInt(readline());

const instructions = []
for (let i = 0; i < n; i++) {
    instructions.push(readline().split(" "));
}

instructions.forEach(row => console.error(row.join(" ")))
console.error(register);
console.error("---------------------------");

let index = 0;
while (index < instructions.length) {
    let instruction = instructions[index];
    console.error("-->", instruction);

    switch (instruction[0]) {
        case "MOV":
            movRegister(instruction, register);
            break;
        case "ADD":
            addInstruction(instruction, register);
            break;
        case "SUB":
            subInstruction(instruction, register);
            break;
        case "JNE":
            let src = instruction[2];
            let value1 = parseInt(instruction[1]);

            let value2 = instruction[3];
            value2 = Number.isInteger(parseInt(value2)) ? parseInt(value2) : register[value2];

            if (register[src] !== value2) {
                index = value1 - 1;
            }
            break;
    }

    console.error(register);
    console.error("---------------------------");

    index++;
}


console.log(register.a, register.b, register.c, register.d);