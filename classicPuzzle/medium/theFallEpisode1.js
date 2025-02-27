
var inputs = readline().split(' ');
const W = parseInt(inputs[0]); // number of columns.
const H = parseInt(inputs[1]); // number of rows.

const map = [];
for (let i = 0; i < H; i++) {
    map.push(readline().split(" ").map(Number)); // represents a line in the grid and contains W integers. Each integer represents one room of a given type.
}

map.forEach(row => console.error(row.join(" ")));

const EX = parseInt(readline()); // the coordinate along the X axis of the exit (not useful for this first mission, but must be read).
console.error("exit:", EX);

// game loop
while (true) {
    var inputs = readline().split(' ');
    let XI = parseInt(inputs[0]);
    let YI = parseInt(inputs[1]);
    const POS = inputs[2];

    const type = map[YI][XI];
    console.error("current pos:", XI, YI, POS);
    console.error("type:", type);

    switch (type) {
        case 0:
            break;
        case 1: case 3: case 7: case 8: case 9: case 12: case 13:
            YI++;
            break;
        case 2: case 6:
            if (POS === "LEFT") {
                XI++;
            }
            else if (POS === "RIGHT") {
                XI--;
            }
            break;
        case 4:
            if (POS === "TOP") {
                XI--;
            }
            else if (POS === "RIGHT") {
                YI++;
            }
            break;
        case 5:
            if (POS === "TOP") {
                XI++;
            }
            else if (POS === "LEFT") {
                YI++;
            }
            break;
        case 10:
            XI--;
            break;
        case 11:
            XI++;
            break;
    }


    // One line containing the X Y coordinates of the room in which you believe Indy will be on the next turn.
    console.log(XI, YI);
    console.error("--------------------------");
}
