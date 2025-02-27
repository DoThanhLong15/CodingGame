function parsePodProperties(line) {
    const splitLine = line.split(' ').map(v => parseInt(v));
    // The first integer is the unique identifier of the pod.
    const id = splitLine.shift();
    // The second integer is the number numStops of stops in the pod's path.
    // const numStops =
    splitLine.shift(); // no need, we can count the array
    // The next numStops integers represent the pod's path, i.e. the identifiers of each building on its itinerary.
    return {id, itinerary: splitLine}
}

// If the building is a landing pad:
// 0 buildingId coordX coordY numAstronauts astronautType1 astronautType2 ...
//   The composition of the group is fixed: an identical group will arrive each month.
// Otherwise, the first number is positive and the building is a lunar module:
// moduleType buildingId coordX coordY
function parseBuildingProperties(line) {
    const splitLine = line.split(' ').map(v => parseInt(v));
    const building = {};
    building.type = splitLine.shift();
    building.id = splitLine.shift();
    building.x = splitLine.shift();
    building.y = splitLine.shift();
    if (building.type === 0) { // landing pad
        // building.numAstronauts =
        splitLine.shift(); // no need, we can count the array
        building.astronauts = splitLine;
    }
    return building;
}

function findDirectRoute(routes, a, b) {
    return routes.find(route => {
        return (route.buildingId1 === a && route.buildingId2 === b)
            || (route.buildingId2 === b && route.buildingId1 === a)
    })
}

function findAnyRoute(routes, a, b) {
    // heuristic - if A or B aren't connected to anything, there will be no route
    for (const node of [a, b]) {
        if (routes.filter(r => r.buildingId1 === node || r.buildingId2 === node).length === 0) {
            console.error(`${node} is not connected`);
            return null;
            // throw new Error(`${node} is not connected`);
        }
    }

    const queue = [];
    const visited = [];
    queue.push([a, []]);

    while (queue.length) {
        const [current, path] = queue.shift();
        visited.push(current);
        const routesWithCurrent = routes.filter(route => {
            return route.buildingId1 == current || route.buildingId2 == current
        });
        // console.error({current, path, routesWithCurrent});
        // if any of them is B, stop
        const found = routesWithCurrent.find(r => r.buildingId1 === b || r.buildingId2 === b);
        if (found) {
            return [...path, found];
        } else {
            routesWithCurrent.forEach(r => {
                const otherNode = r.buildingId1 === current ? r.buildingId2 : r.buildingId1;
                if (!visited.includes(otherNode)) {
                    queue.push([otherNode, [...path, r]]);
                }
            })
        }
    }
    console.error(`no route from ${a} to ${b}`);
    return null;
    // throw new Error(`no route from ${a} to ${b}`);
}

function findPod(pods, a, b) {
    return pods.find(pod => {
        return (pod.itinerary.includes(a) && pod.itinerary.includes(b));
    })
}

// cache the link distances, they never change
const linkDistanceCache = new Map();
function distanceBuildings(fromId, toId) {
    let cached = linkDistanceCache.get(`${fromId}-${toId}`);
    if (!cached) {
        cached = linkDistanceCache.get(`${toId}-${fromId}`);
    }
    if (!cached) {
        cached = distance(buildingsById.get(fromId), buildingsById.get(toId));
        linkDistanceCache.set(`${fromId}-${toId}`, cached);
    }
    return cached;
}

// function getBuildingsByType(allBuildings) {
//     const buildingsByType = {};
//     allBuildings.forEach(b => {
//         buildingsByType[b.type] = buildingsByType[b.type] || [];
//         buildingsByType[b.type].push(Object.assign({}, b));
//     })
//     return buildingsByType;
// }
function randomSelect(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function findMiddlePoint(x1, y1, x2, y2) {
    return [(x1 + x2)/2, (y1 + y2)/2];
}

function findNodesWithin(xMin, xMax, yMin, yMax) {
    return allBuildings.filter(b => {
        return b.x > xMin && b.x < xMax && b.y > yMin && b.y < yMax;
    });
}

// function findPotentialMiddleStations(fromId, toId) {
//     const fromBuilding = buildingsById.get(fromId);
//     const toBuilding = buildingsById.get(toId);
//     const middle = findMiddlePoint(fromBuilding.x, fromBuilding.y, toBuilding.x, toBuilding.y);
//     const horizontal = Math.abs(middle[0] - fromBuilding.x);
//     const vertical = Math.abs(middle[1] - fromBuilding.y);
//     const squareThirdSize = Math.max(horizontal, vertical) * 2 / 3;
//     for (let i = 0; i < 5; i++) {
//         const xMax = middle[0] + squareHalfSize;
//         const xMin = middle[0] - squareHalfSize;
//         const yMax = middle[1] + squareHalfSize;
//         const yMin = middle[1] - squareHalfSize;
//         found = findNodesWithin(xMin, xMax, yMin, yMax);
//     }
//     return findNodesWithin(xMin, xMax, yMin, yMax);
// }
function findIntersecting(routes, fromId, toId) {
    const intersecting = [];
    routes.forEach(route => {
        if (segmentsIntersect(
            buildingsById.get(fromId),
            buildingsById.get(toId),
            buildingsById.get(route.buildingId1),
            buildingsById.get(route.buildingId2),
        )) {
            intersecting.push(route);
        }
    })
    return intersecting;
}

function splitIntoSegments(fromId, toId) {
    const fromBuilding = buildingsById.get(fromId);
    const toBuilding = buildingsById.get(toId);

    const buildings = [fromBuilding];
    allBuildings.forEach(b => {
        if (b.id === fromId) return
        if (b.id === toId) return
        if (pointOnSegmentIds(b.id, fromId, toId)) {
            buildings.push(b);
        }
    });
    buildings.push(toBuilding);
    return buildings.sort((a, b) => {
        return (a.x - b.x) ? (a.x - b.x) : (a.y - b.y);
    });
}

// To verify whether building A stands on segment BC,
// it is possible to create triangle ABC and check if distance BC equals BA+AC.
function distance(p1, p2) {
    return Math.sqrt((p2.x - p1.x)**2 + (p2.y - p1.y)**2)
}
// function pointOnSegment(building, from, to) {
//     const epsilon = 0.0000001;
//     const x = distance(from, building) + distance(building, to) - distance(from, to);
//     return (-epsilon < x) && (x < epsilon)
// }
function pointOnSegmentIds(buildingId, fromId, toId) {
    const epsilon = 0.0000001;
    const x = distanceBuildings(fromId, buildingId) + distanceBuildings(buildingId, toId) - distanceBuildings(fromId, toId);
    return (-epsilon < x) && (x < epsilon)
}

// To verify whether two line segments AB and CD cross outside their extremities,
// you can use the segmentsIntersect function defined below:
function orientation(p1, p2, p3) {
    let prod = (p3.y - p1.y) * (p2.x - p1.x) - (p2.y - p1.y) * (p3.x - p1.x);
    return Math.sign(prod);
}
function segmentsIntersect(A, B, C, D) {
    return orientation(A, B, C) * orientation(A, B, D) < 0 && orientation(C, D, A) * orientation(C, D, B) < 0;
}

const allBuildings = [];
const buildingsByType = {};
const buildingsById = new Map();
// game loop
while (true) {
    const resources = parseInt(readline());
    let estRemainingResources = resources;
    const numTravelRoutes = parseInt(readline());
    const routes = [];
    for (let i = 0; i < numTravelRoutes; i++) {
        var inputs = readline().split(' ').map(v => parseInt(v));
        const buildingId1 = inputs[0];
        const buildingId2 = inputs[1];
        const capacity = inputs[2]; // capacity 0 = teleport
        routes.push({buildingId1, buildingId2, capacity})
    }
    const numPods = parseInt(readline());
    const pods = [];
    for (let i = 0; i < numPods; i++) {
        const podProperties = readline();
        pods.push(parsePodProperties(podProperties));
    }
    const newBuildings = [];
    const numNewBuildings = parseInt(readline());
    for (let i = 0; i < numNewBuildings; i++) {
        const buildingProperties = readline();
        newBuildings.push(parseBuildingProperties(buildingProperties));
    }
    // end reading inputs
    // console.error(JSON.stringify({resources, numTravelRoutes, newBuildings}, null, 2))
    // now parse them into more suitable datastructures
    newBuildings.forEach(b => {
        if (b.type === 0) {
            // group the astronauts
            b.astronauts = b.astronauts.reduce((res, astr) => {res[astr] = (res[astr] || 0) + 1; return res}, {});
        }
        // add new buildings to the index byType
        if (!buildingsByType.hasOwnProperty(b.type)) {
            buildingsByType[b.type] = [];
        }
        buildingsByType[b.type].push(b);
        // add new buildings to the index byId
        buildingsById.set(b.id, b);
        // add new buildings to allBuildings
        allBuildings.push(b);
    });

    // each tube can only accommodate a single pod at a time,
    // pod takes an entire day to travel through it (regardless of its length)
    // pod can carry a maximum of 10 passengers
    // upgraded tubes can be traversed by several pods simultaneously
    // each building can only be connected to at most 5 magnetic tubes.
    // hmm, we will not have any info about the current location of the astronauts
    // we will need to simulate it, exactly as the game would do it
    // find which routes are necessary
    // find all landing pads
    // for each landing pad, find which astronauts are there
    const transports = [];
    buildingsByType[0].forEach(pad => {
        Object.entries(pad.astronauts).forEach(entry => {
            transports.push(
                {
                    from: pad.id,
                    toType: parseInt(entry[0]),
                    amount: entry[1],
                }
            );
        });
    });
    // where do they need to go
    // "Transport X astronauts from A to B"
    // sorted by amount of astronauts descending
    const prioritized = transports.sort((a, b) => b.amount - a.amount);
    // console.error("prioritized", prioritized);
    // TODO: maybe we can prioritize by cost/benefit ratio
    // TODO: we have transport request from landing pad to building type
    // create transport requests to a specific building ID
    // then prioritize them
    // for each transport request find a random building with the desired type
    prioritized.forEach(transport => {
        // all buildings of that type (TODO balancing?)
        // buildingsByType[transport.toType].forEach(b => {
        //     transport.to = b.id;
        // });
        // random building of that type
        // transport.to = randomSelect(buildingsByType[transport.toType]).id;
        // TODO: nearest building of that type (nearest by number of hops? even when not built yet?)
        let minDistance = Infinity;
        transport.to = buildingsByType[transport.toType].reduce((res, b) => {
            const currDistance = distanceBuildings(res.id, b.id);
            if (currDistance < minDistance) {
                minDistance = currDistance;
                return b
            } else {
                return res
            }
        }).id;
    })

    // some of those transport requests are already satisfied - how can we calculate that?
    // shortest way to connect a desired destination to our network (any node)
    // minimum spanning tree!
    // better build by connecting nearby nodes, instead of going across - this allows intersections
    // but that takes more days of transport
    // BFS from the landing pad to the destination
    // counting costs
    // but needs to somehow take into account the non-existent tubes
    // first work with the existing tubes, then try to add new, greedy
    // random? limited time?
    // bin packing? satisfy the most requests with given resources
    // try to build them one by one, by descending priority
    const construct = [];

    let podNextId = pods.reduce((next, pod) => Math.max(next, pod.id), 0) + 1;
    console.error(`${prioritized.length} transport requests`);
    for (const transport of prioritized) {
        console.error(`trying to satisfy ${transport.from} to ${transport.to}`);
        if (estRemainingResources < 1000) {
            console.error(`only ${estRemainingResources} resources left`);
            break;
        }

        // TODO: count the hop distance to destination
        // we can never remove tubes and they can never intersect, so build them carefully
        // first try to connect it to the nearest destination,
        // only if that is already done, try to balance
        // if direct route is found, it will not even execute the BFS search
        let foundRoute = findDirectRoute(routes, transport.from, transport.to);
        if (!foundRoute) {
            foundRoute = findAnyRoute(routes, transport.from, transport.to);
        }
        if (!foundRoute) {
            const distance = distanceBuildings(transport.from, transport.to);
            const estCost = distance * 10 + 1000;
            const intersects = findIntersecting(routes, transport.from, transport.to);
            // console.error({from: transport.from, to: transport.to, intersects})
            // FIXME: we should be finding intersects and adding alternative requests for each segment separately
            if (intersects.length) {
                console.error(`cannot build from ${transport.from} to ${transport.to}, intersects ${intersects.length}`);
                // this times out - we are adding the same intersecting routes over and over
                // can we build from transport.from to intersects.buildingId1? etc
                // keep it simple, just connect each end of the transport request to any part of our existing network
                // try to build the teleport here
                construct.push(`TELEPORT ${transport.from} ${transport.to}`);
                continue;
            }
            // const potential = findPotentialMiddleStations(transport.from, transport.to);
            const segments = splitIntoSegments(transport.from, transport.to);
            // console.error("segments", transport.from, transport.to, segments);
            console.error({estCost, estRemainingResources});
            if (estCost > estRemainingResources) continue;
            // if ((estCost + 1000) > 5000) {
            //     // better build a teleport
            //     // the map is never big enough for a teleport to be cheaper than a tube
            //     // diagonal would cost 1835
            //     construct.push(`TELEPORT ${transport.from} ${transport.to}`);
            //     throw new Error("ff")
            // } else {
                // const itinerary = [segments[0].id];
                let prev = segments[0];
                for (let i = 1; i < segments.length; i++) {
                    construct.push(`TUBE ${prev.id} ${segments[i].id}`);
                    // presuming it will be built:
                    routes.push({buildingId1: prev.id, buildingId2: segments[i].id, capacity: 1});
                    // itinerary.push(segments[i].id);
                    construct.push(`POD ${podNextId++} ${prev.id} ${segments[i].id} ${prev.id}`);
                    prev = segments[i];
                }
                // const revItinerary = itinerary.slice(0, -1).reverse();
                // itinerary.push(...revItinerary);
                // construct.push(`POD ${podNextId++} ${itinerary.join(' ')}`);
                // but it will fail if it intersects other route or building
                // TODO: remember that we need a pod here
            // }
            estRemainingResources -= estCost;
        }

        // // in case some previous pod construction failed - find routes which still need pods
        // // have a list of tubes which still need pods?
        // // construct itinerary from multiple hops
        // const foundPod = findPod(pods, transport.from, transport.to);
        // if (!foundPod) {
        //     // just try to build it
        //     // first there needs to be a tube, so maybe do this only if foundRoute?
        //     construct.push(`POD ${podNextId++} ${transport.from} ${transport.to} ${transport.from}`);
        //     estRemainingResources -= 1000;
        // }
    }

    // if we have more money, we could replace some tubes with teleports, which would unblock intersecting tubes
    // if (estRemainingResources > 5000) {
    //     const nonTeleports = routes.filter(r => r.capacity > 0);
    //     const randomRoute = nonTeleports[Math.floor(Math.random() * nonTeleports.length)];
    //     if (randomRoute) {
    //         const foundPod = findPod(pods, randomRoute.buildingId1, randomRoute.buildingId2);
    //         if (foundPod) {
    //             construct.push(`DESTROY ${foundPod.id}`);
    //         }
    //         construct.push(`TELEPORT ${randomRoute.buildingId1} ${randomRoute.buildingId2}`);
    //     }
    // }
    // TUBE buildingId1 buildingId2 // 10 resource for each 1km of tube, rounded down. World is 160x90km
    // UPGRADE buildingId1 buildingId2 // original construction cost multiplied by the new capacity
    // TELEPORT buildingIdEntrance buildingIdExit // cost 5000
    // POD podId buildingId1 buildingId2 buildingId3 ... // costs 1000. Id between 1 and 500. If the last stop is the same as the first, the pod will loop around the path indefinitely, otherwise it will remain in place after reaching its last stop.
    // DESTROY podId // receive 750 resources back
    // WAIT // no action
    if (construct.length === 0) construct.push("WAIT");
    console.log(construct.join(';'));
}
