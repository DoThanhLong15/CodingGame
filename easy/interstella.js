
const parseVector = (input) => {
    let vector = {
        'i': 0,
        'j': 0,
        'k': 0
    }

    let iIndex = input.indexOf("i");
    let jIndex = input.indexOf("j");
    let kIndex = input.indexOf("k");

    let temp = "";
    let symbol = "+";
    for (let char of input) {
        if (char === "-" || char === "+") {
            symbol = char;
            continue;
        }

        if (char !== "i" && char !== "j" && char !== "k") {
            temp += char;
            continue;
        }

        let number = temp === "" ? 1 : parseInt(temp);
        vector[char] = symbol === "+" || symbol === "" ? number : -number;

        temp = "";
        symbol = "";
    }

    console.error(vector);

    return vector;
}

const gcd = (a, b) => {
    if (b === 0)
        return Math.abs(a);

    return gcd(b, a % b);
}

const simplifyNumber = (vector) => {
    const { i, j, k } = vector;

    let gcdValue = gcd(gcd(i, j), k);

    return {
        i: i / gcdValue,
        j: j / gcdValue,
        k: k / gcdValue
    };
}

const handleDirectionVector = (shipVector, wormholeVector) => {
    let direction = {
        'i': wormholeVector.i - shipVector.i,
        'j': wormholeVector.j - shipVector.j,
        'k': wormholeVector.k - shipVector.k,
    }

    return direction;
}

const handleNumber = (number, char, result) => {
    let string = "";

    if (number !== 0) {
        if (result.length === 0) {
            string += number === -1 ? "-" : "";
        }
        else {
            string += number > 0 ? "+" : (number === -1 ? "-" : "");
        }

        if (Math.abs(number) !== 1) {
            string += number;
        }

        string += char;
    }

    return string;
}

const showVector = (vector) => {
    if (vector.i !== 0 || vector.j !== 0 || vector.k !== 0) {
        vector = simplifyNumber(vector);

        let iNumber = vector.i;
        let jNumber = vector.j;
        let kNumber = vector.k;

        let result = "";
        result += handleNumber(iNumber, 'i', result);
        result += handleNumber(jNumber, 'j', result);
        result += handleNumber(kNumber, 'k', result);

        return result;
    }

    return "";
}

const calculateDistance = (vector) => {
    return Math.sqrt(vector.i * vector.i + vector.j * vector.j + vector.k * vector.k);
}

const ship = readline();
const wormhole = readline();

console.error(ship);
console.error(wormhole)

let shipVector = parseVector(ship);

let wormholeVector = parseVector(wormhole);

const direction = handleDirectionVector(shipVector, wormholeVector);
console.error(direction);

console.log('Direction:', showVector(direction));
console.log('Distance:', calculateDistance(direction).toFixed(2));