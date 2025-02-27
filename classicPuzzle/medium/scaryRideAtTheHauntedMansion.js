const wagonNumber = 10;

const checkValidWagonRemain = (index, wagonNeed) => {
    return wagonNumber - index >= wagonNeed;
}

const fillTheRide = (rightSeats, leftSeats, adult, kid, index) => {
    let numberWagonNeed = adult.length;

    if (wagonNumber - index < numberWagonNeed) {
        return -1;
    }

    while (kid.length > 0 && adult.length > 0) {
        rightSeats[index] = adult.shift();
        leftSeats[index] = kid.shift();
        index++;
        numberWagonNeed--;
    }

    if (numberWagonNeed === 1) {
        rightSeats[index] = adult.pop();
        index++;
    }

    return index;
}


const n = parseInt(readline());
const groups = readline().split(" ");

console.error(groups.join(" "));
console.error("------------------------");

let index = 0;
let isOnRide = false;
let rideNumber = 1;
let startGroup = 0;

for (let groupIndex = 0; groupIndex < n; groupIndex++) {
    const adult = [];
    const kid = [];

    const group = groups[groupIndex].split("");

    for (let people of group) {
        switch (people) {
            case 'A':
                adult.push('A');
                break;
            case 'k':
                kid.push('k')
                break;
            case 'x':
                isOnRide = true;
                kid.unshift('x');
                break;
        }
    }

    if (adult.length >= kid.length) {
        while (adult.length > kid.length + 1) {
            kid.push(adult.pop());
        }

        console.error(adult);
        console.error(kid);
        console.error("------------------------");

        if (!checkValidWagonRemain(index, adult.length)) {
            startGroup = groupIndex
            index = adult.length;
            rideNumber++;
        }
        else {
            index += adult.length;
        }

        if (isOnRide) {
            break;
        }
    }
}

console.error(startGroup);
console.error(rideNumber);

let rightSeats = new Array(wagonNumber).fill('D');
let leftSeats = new Array(wagonNumber).fill('D');
index = 0;

do {
    const adult = [];
    const kid = [];

    if(startGroup >= groups.length) {
        break;
    }

    const group = groups[startGroup].split("");

    for (let people of group) {
        switch (people) {
            case 'A':
                adult.push('A');
                break;
            case 'k':
                kid.push('k')
                break;
            case 'x':
                isOnRide = true;
                kid.unshift('x');
                break;
        }
    }

    if (adult.length >= kid.length) {
        while (adult.length > kid.length + 1) {
            kid.push(adult.pop());
        }

        index = fillTheRide(rightSeats, leftSeats, adult, kid, index);

        if (index === -1) {
            break;
        }
    }

    startGroup++;
} while (true);

console.log(rideNumber);
console.log("/< |", rightSeats.join(" | "), "|");
console.log("\\< |", leftSeats.join(" | "), "|");