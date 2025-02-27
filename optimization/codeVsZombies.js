const parseAshPosition = (inputString) => {
    return {
        x: parseInt(inputString[0]),
        y: parseInt(inputString[1])
    }
}

const parseHumanPosition = (humanCount) => {
    const humans = [];

    for (let i = 0; i < humanCount; i++) {
        var inputs = readline().split(' ');
        const humanId = parseInt(inputs[0]);
        const humanX = parseInt(inputs[1]);
        const humanY = parseInt(inputs[2]);

        humans.push({
            id: humanId,
            x: humanX,
            y: humanY
        })
    }

    return humans;
}

const parseZombiePosition = (zombieCount) => {
    const zombies = [];

    for (let i = 0; i < zombieCount; i++) {
        var inputs = readline().split(' ');
        const zombieId = parseInt(inputs[0]);
        const zombieX = parseInt(inputs[1]);
        const zombieY = parseInt(inputs[2]);
        const zombieXNext = parseInt(inputs[3]);
        const zombieYNext = parseInt(inputs[4]);

        zombies.push({
            id: zombieId,
            x: zombieX,
            y: zombieY,
            nextX: zombieXNext,
            nextY: zombieYNext
        })
    }

    return zombies;
}

const getDistance = ([x1, y1], [x2, y2]) => {
    return Math.floor(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
}

const findNearestHuman = (ash, humans) => {
    let minDistance = Infinity;
    let selectedHuman = null;

    for (let human of humans) {
        let distance = getDistance([ash.x, ash.y], [human.x, human.y]);

        if(distance < minDistance) {
            minDistance = distance;
            selectedHuman = human;
        }
    }

    return selectedHuman;
}

while (true) {
    const ash = parseAshPosition(readline().split(' '));
    const humans = parseHumanPosition(parseInt(readline()));
    const zombies = parseZombiePosition(parseInt(readline()));

    console.error(ash);
    console.error(humans);
    console.error(zombies);

    const nearestHuman = findNearestHuman(ash, humans);
    if(nearestHuman) {
        console.log(nearestHuman.x, nearestHuman.y);
    }
    else {
        console.log(0, 0);
    }
}
