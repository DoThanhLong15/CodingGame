const countRussianDoll = (input) => {

    if (input[0] >= 0) {
        return -1;
    }

    const dollStack = [];

    let dollRootCount = 0;
    let dollCount = 0;

    for (let value of input) {
        if (isNaN(value) || value === 0 || value === -0) {
            return -1;
        }

        if (value < 0) {
            if (dollStack.length) {
                dollStack[dollStack.length - 1].child.push(-value);
            }
            else {
                dollRootCount++;
            }

            dollStack.push({
                value: Math.abs(value),
                child: []
            });
        }
        else if (dollStack.length === 0 || dollRootCount > 1) {
            return -1;
        }
        else {
            let lastDoll = dollStack.pop();

            let totalChildValue = lastDoll.child.length ? lastDoll.child.reduce((sum, child) => sum += child, 0) : 0;

            if (Math.abs(lastDoll.value) !== value || totalChildValue >= lastDoll.value) {
                return -1
            }

            if (lastDoll.child.length === 0) {
                dollCount++;
            }
        }
    }

    return dollStack.length ? -1 : dollCount;
}

const n = parseInt(readline());

for (let i = 0; i < n; i++) {
    const line = readline().split(" ").map(Number);

    console.error(line.join(" "));
    console.log(countRussianDoll(line));
    console.error("---------------------------");
}