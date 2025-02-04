const getCitiesDistance = ([xA, yA], [xB, yB]) => {
    return Math.sqrt(Math.pow(xA - xB, 2) + Math.pow(yA - yB, 2));
}

const N = parseInt(readline());

const cityPosition = [];

for (let i = 0; i < N; i++) {
    var inputs = readline().split(' ');
    const X = parseInt(inputs[0]);
    const Y = parseInt(inputs[1]);

    cityPosition.push([X, Y]);
}

console.error(cityPosition);
console.error("------------------------------");

const cityVisited = new Set([cityPosition[0]]);
let index = 0;
let distance = 0;
while (cityVisited.size < N) {
    let min = Number.MAX_VALUE;

    let startPosition = cityPosition[index];
    console.error("start", startPosition);

    for(let i = 0; i < N; i++) {
        let city = cityPosition[i];

        if(i !== index && !cityVisited.has(city)) {
            let nextDistance = getCitiesDistance(startPosition, city);

            console.error(i, nextDistance);
            if(nextDistance < min) {
                min = nextDistance;
                index = i;
            }
        }
    }

    distance += min;
    cityVisited.add(cityPosition[index]);
    
    console.error("next", cityPosition[index]);
    console.error("--->", distance)
    console.error("------------------------------");
}

distance += getCitiesDistance(cityPosition[0], cityPosition[index]);

console.log(Math.round(distance));
