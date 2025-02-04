
const sequence = readline();

console.error(sequence);

let stack = [];
let weights = {};
let depths = {};
let isClose = false;

for (let i = 0; i < sequence.length; i++) {
    let tag = sequence[i];

    if (tag === '-') {
        isClose = true;
        continue;
    }

    if (isClose) {
        let lastTag = stack.pop();
        let depth = depths[lastTag];

        if (!weights[lastTag])
            weights[lastTag] = 0;

        weights[lastTag] += 1 / depth;
        depths[lastTag] -= 1;

        isClose = false;
    }
    else {
        stack.push(tag);
        let depth = stack.length;
        depths[tag] = depth;

        if (!weights[tag])
            weights[tag] = 0;
    }

    console.error(tag);
    console.error("stack", stack);
    console.error("weights", weights);
    console.error("depths", depths);
    console.error("----------------------");
}

let maxWeight = -Infinity;
let resultTag = '';

for (let tag in weights) {
    if (weights[tag] > maxWeight) {
        maxWeight = weights[tag];
        resultTag = tag;
    }
}

console.log(resultTag);