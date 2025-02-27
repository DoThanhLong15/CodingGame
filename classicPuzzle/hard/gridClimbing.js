
const n = parseInt(readline());
const costs = readline().split(' ').map(Number);
const grid = [];
for (let i = 0; i < n; i++) {
    grid.push(readline().split('').map(Number));
}

class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(node) {
        this.heap.push(node);
        this.heap.sort((a, b) => a[0] - b[0]);
    }

    pop() {
        return this.heap.shift();
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

function findMinimumCost(n, costs, grid) {
    let dist = Array.from({ length: n }, () => Array(n).fill(Infinity));
    let visited = Array.from({ length: n }, () => Array(n).fill(false));
    let pq = new MinHeap();
    
    dist[0][0] = grid[0][0];
    pq.push([grid[0][0], 0, 0]);

    while (!pq.isEmpty()) {
        let [curCost, x, y] = pq.pop();

        if (visited[x][y]) continue;
        visited[x][y] = true;

        if (x === n - 1 && y === n - 1) return curCost;

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (i === x && j === y || visited[i][j]) continue;
                
                let d = Math.max(Math.abs(i - x), Math.abs(j - y));
                let moveCost = costs[d - 1] + grid[i][j];
                let newCost = curCost + moveCost;

                if (newCost < dist[i][j]) {
                    dist[i][j] = newCost;
                    pq.push([newCost, i, j]);
                }
            }
        }
    }

    return -1;
}

console.log(findMinimumCost(n, costs, grid));