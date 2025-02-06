
var inputs = readline().split(' ');
const numberOfNode = parseInt(inputs[0]);
const numberOfEdge = parseInt(inputs[1]);
const start = parseInt(inputs[2]);
const goal = parseInt(inputs[3]);

var inputs = readline().split(' ');
const heuristics = {};
for (let i = 0; i < numberOfNode; i++) {
    heuristics[i] = parseInt(inputs[i]);
}

const graph = Array.from({ length: numberOfNode }, () => []);
for (let i = 0; i < numberOfEdge; i++) {
    var inputs = readline().split(' ');
    const X = parseInt(inputs[0]);
    const Y = parseInt(inputs[1]);
    const C = parseInt(inputs[2]);

    graph[X].push([Y, C]);
    graph[Y].push([X, C]);
}

const visited = new Set();
let openSet = new Array();
let g = Array(numberOfNode).fill(Infinity);

g[start] = 0;
openSet.push([start, heuristics[start]]);

while (openSet.length > 0) {
    let [node, fValue] = openSet.shift();

    if(visited.has(node)) 
        continue;

    console.log(node, fValue);

    if (node === goal)
        break;

    visited.add(node);

    for (let [neighbor, cost] of graph[node]) {
        if (visited.has(neighbor))
            continue;

        let newG = g[node] + cost;

        if (newG < g[neighbor]) {
            g[neighbor] = newG;
            let fNew = newG + heuristics[neighbor];

            openSet.push([neighbor, fNew]);
        }
    }

    openSet.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
}