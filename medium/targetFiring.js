const damageForSpaceShip = {
    "FIGHTER": 20,
    "CRUISER": 10
}

const sumDamageFromAlien = (spaceShips) => {
    return spaceShips.reduce((damage, spaceShip) => damage + spaceShip.damage, 0);
}

const sortSpaceShips = (spaceShip1, spaceShip2) => {
    const totalDamage = spaceShip1.damage + spaceShip2.damage;
    const strategy1 = spaceShip1.turnDestroy * totalDamage + spaceShip2.turnDestroy * spaceShip2.damage;
    const strategy2 = spaceShip2.turnDestroy * totalDamage + spaceShip1.turnDestroy * spaceShip1.damage;

    return strategy1 - strategy2;
}

const getBeamDamageTaken = (spaceShip) => {
    let damage = damageForSpaceShip[spaceShip.type] - spaceShip.armor;

    return damage > 0 ? damage : 1;
}

const N = parseInt(readline());
const alienSpaceships = [];

for (let i = 0; i < N; i++) {
    var inputs = readline().split(' ');

    let damageTaken = (damageForSpaceShip[inputs[0]] - parseInt(inputs[2])) > 0 
        ? (damageForSpaceShip[inputs[0]] - parseInt(inputs[2])): 1;
    let turnDestroy = Math.ceil(parseInt(inputs[1]) / damageTaken);

    alienSpaceships.push({
        'type': inputs[0],
        'hp': parseInt(inputs[1]),
        'armor': parseInt(inputs[2]),
        'damage': parseInt(inputs[3]),
        'damageTaken': damageTaken,
        'turnDestroy': turnDestroy
    })
}
let shieldStrength = 5000;

alienSpaceships.sort(sortSpaceShips);
console.error("---< sort >---")
for(let sp of alienSpaceships) {
    console.error(`damage: ${sp.damage}, taken: ${sp.damageTaken}, turnDestroy: ${sp.turnDestroy}`)
}

do {
    shieldStrength -= sumDamageFromAlien(alienSpaceships);

    if (alienSpaceships[0].hp - getBeamDamageTaken(alienSpaceships[0]) <= 0) {
        alienSpaceships.shift();
    }
    else {
        alienSpaceships[0].hp -= getBeamDamageTaken(alienSpaceships[0]);
    }

} while (alienSpaceships.length > 0 && shieldStrength > 0);

console.log(shieldStrength < 0 ? "FLEE" : shieldStrength);