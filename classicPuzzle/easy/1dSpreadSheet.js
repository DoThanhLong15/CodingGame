
const handleArgNumber = (cells, arg) => {
    if (arg === "_") {
        return [0, -1];
    }

    if (arg[0] === "$") {
        let index = parseInt(arg.slice(1));

        return [cells[index], index];
    }

    return [parseInt(arg), -1];
}

const handleOperation = (index, cells, spreadSheet) => {
    const [operation, arg1, arg2] = spreadSheet[index];
    console.error("-->", operation, arg1, arg2)

    let [argValue1, cellIndex1] = handleArgNumber(cells, arg1);
    if (cellIndex1 !== -1 && argValue1 === "") {
        argValue1 = handleOperation(cellIndex1, cells, spreadSheet);
    }

    let [argValue2, cellIndex2] = handleArgNumber(cells, arg2);
    if (cellIndex2 !== -1 && argValue2 === "") {
        argValue2 = handleOperation(cellIndex2, cells, spreadSheet);
    }

    console.error([argValue1, cellIndex1], [argValue2, cellIndex2])


    let result = "";
    switch (operation) {
        case "VALUE":
            result = argValue1;
            break;
        case "ADD":
            result = argValue1 + argValue2;
            break;
        case "SUB":
            result = argValue1 - argValue2;
            break;
        case "MULT":
            result = argValue1 * argValue2;
            break;
    }

    cells[index] = result;

    return result;
}

const N = parseInt(readline());
const spreadSheet = [];
for (let i = 0; i < N; i++) {
    var inputs = readline().split(' ');
    const operation = inputs[0];
    const arg1 = inputs[1];
    const arg2 = inputs[2];

    spreadSheet.push([operation, arg1, arg2]);
}

console.error("-----------------------------");

const cells = new Array(N).fill("");
for (let index = 0; index < N; index++) {
    if (cells[index] === "") {
        let [operation, arg1, arg2] = spreadSheet[index];

        let result = handleOperation(index, cells, spreadSheet);
        cells[index] = parseInt(result);

        console.error(operation, arg1, arg2)
        console.error(result);
        console.error("-----------------------------");
    }
}

console.log(cells.join("\n"));