const topologicalSort = (libraries, dependencies) => {
    let graph = {};
    let inDegree = {};
    let sortedOrder = [];

    for (const library of libraries) {
        graph[library] = [];
        inDegree[library] = 0;
    }

    for (const [library, requires] of Object.entries(dependencies)) {
        for (const dependency of requires) {
            graph[dependency].push(library);
            inDegree[library]++;
        }
    }
    // console.error(inDegree)

    let queue = Object.keys(inDegree).filter(lib => inDegree[lib] === 0);
    queue.sort();

    while (queue.length > 0) {
        let current = queue.shift();
        sortedOrder.push(current);

        for (const dependent of graph[current]) {
            inDegree[dependent]--;
            if (inDegree[dependent] === 0) {
                queue.push(dependent);
                queue.sort();
            }
        }
    }

    if (sortedOrder.length !== libraries.length) {
        console.log("Fatal error: interdependencies.");
        return;
    }
    else if (sortedOrder.length === libraries.length){
        console.log("Suggest to change import order:");
        for (const lib of sortedOrder) {
            console.log(`import ${lib}`);
        }
    }
}

const findLibraryIndex = (libraries, library) => {
    for (let index in libraries) {
        if (libraries[index] === library) {
            return parseInt(index);
        }
    }

    return -1;
}

const nImp = parseInt(readline());
const libraries = [];
for (let i = 0; i < nImp; i++) {
    const _import = readline().split(" ");
    libraries.push(_import[1]);
}

const nDep = parseInt(readline());
const dependencies = {};
for (let i = 0; i < nDep; i++) {
    const dependency = readline().replace(/requires |,/g, '').split(" ");

    dependencies[dependency.shift()] = dependency;
}

libraries.forEach(row => console.error(row));
console.error("----------------------------");

console.error(dependencies);
console.error("----------------------------");

let index = 0;
let sortedOrder = [];
while (index < libraries.length && index >= 0) {
    let importLibrary = libraries[index];

    let requires = dependencies[importLibrary];

    if (requires) {
        let libraryIndex = findLibraryIndex(libraries, importLibrary);

        for (const require of requires) {
            let requireIndex = findLibraryIndex(libraries, require);

            if (requireIndex > libraryIndex) {
                console.log(`Import error: tried to import ${importLibrary} but ${require} is required.`);
                topologicalSort(libraries, dependencies);
                index = -100;
                break;
            }
        }
    }

    index++;
}

if(index === libraries.length) {
    console.log("Compiled successfully!");
}