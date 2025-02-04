
const findNodePath = (tree, node, target, path) => {
    console.error(node, target, path);
    console.error("----------------------------------------");

    if (node.left === target) {
        path.push("Left");
        return true
    }

    if (node.right === target) {
        path.push("Right");
        return true
    }

    if (tree[node.left] && findNodePath(tree, tree[node.left], target, path)) {
        path.push("Left");
        return true
    }

    if (tree[node.right] && findNodePath(tree, tree[node.right], target, path)) {
        path.push("Right");
        return true;
    }

    return false;
}

const N = parseInt(readline());
const V = parseInt(readline());
const M = parseInt(readline());

console.error("Number of nodes:", N);
console.error("Target node index:", V);
console.error("Number of nodes has two children:", M);
console.error("----------------------------------------");

const tree = {};
let root = -1;

for (let i = 0; i < M; i++) {
    var inputs = readline().split(' ');
    const P = parseInt(inputs[0]);
    const L = parseInt(inputs[1]);
    const R = parseInt(inputs[2]);

    if (i === 0) {
        root = P;
    }

    tree[P] = {
        left: L,
        right: R
    }
}

console.error(tree);

if (root === V) {
    console.log("Root");
}
else {
    let path = []
    findNodePath(tree, tree[root], V, path);
    console.log(path.reverse().join(" "));
}