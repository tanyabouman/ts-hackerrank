// https://www.hackerrank.com/challenges/torque-and-development/problem
/*
 * Complete the 'roadsAndLibraries' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER c_lib
 *  3. INTEGER c_road
 *  4. 2D_INTEGER_ARRAY cities
 */

function roadsAndLibraries(n: number, c_lib: number, c_road: number, cities: number[][]): number {
    // find the number of connected sections of the graph
    // initialize connected components as all cities unconnected
    let cityGroup: Map<number,number> = new Map();
    let groupCities: Map<number,number[]> = new Map();
    for (let i=1; i<=n; i++) {
        cityGroup.set(i,i);
        groupCities.set(i,[i]);
    }

    for (const road of cities) {
        const x = road[0];
        const y = road[1];
        const groupX = cityGroup.get(x);
        const groupY = cityGroup.get(y);
        if (groupX != groupY) {
            const groupXCities = groupCities.get(groupX);
            const groupYCities = groupCities.get(groupY);
            for (const yCity of groupYCities) {
                cityGroup.set(yCity,groupX);
            }
            // not sure about the complexity of this set
            groupCities.set(groupX,groupXCities.concat(groupYCities));
            groupCities.delete(groupY);
        }
        // otherwise, they are already known to be connected,
        // so do nothing
    }

    // for each connected group, check whether it's easier to
    // build libraries everywhere or build 1 library with n-1
    // roads
    let cost: number = 0
    for (const cities of groupCities.values()) {
        cost += Math.min(cities.length*c_lib, (cities.length-1)*c_road + c_lib)
    }
    return cost
}

// https://www.hackerrank.com/challenges/find-the-nearest-clone/problem
/*
 * For the unweighted graph, graph:
 *
 * 1. The number of nodes is graphNodes.
 * 3. An edge exists between graphFrom[i] to graphTo[i].
 *
 */
function findShortest(graphNodes, graphFrom, graphTo, ids, val) {
    // map from a node to a list of adjacent nodes
    let adjacencyMap = new Map();
    for (let i=0; i<graphFrom.length; i++) {
        const a = graphFrom[i];
        const b = graphTo[i];
        if (adjacencyMap.has(a)) {
            let adjacents = adjacencyMap.get(a);
            adjacents.push(b);
            adjacencyMap.set(a,adjacents);
        } else {
            adjacencyMap.set(a,[b]);
        }
        if (adjacencyMap.has(b)) {
            let adjacents = adjacencyMap.get(b);
            adjacents.push(a);
            adjacencyMap.set(b,adjacents);
        } else {
            adjacencyMap.set(b,[a]);
        }
    }

    // find the matching nodes
    // findIndex() only finds the first index
    // filter() doesn't give indices.
    // a queue of [node,distance from origin,origin match]
    let nodesToVisit = [];
    for (let i=0; i<graphNodes; i++) {
        if (ids[i] == val) {
            nodesToVisit.push([i+1,0,i+1]);
        }
    }

    if (nodesToVisit.length < 2) {
        return -1;
    }

    // do a modified BFS to find how far away they are from each other
    // start with all nodes at once
    let visitedNodes = new Map();
    while (nodesToVisit.length > 0) {
        // visit first node in queue
        const visitNode = nodesToVisit.shift();
        const newNodes = adjacencyMap.get(visitNode[0]);
        for (const nn of newNodes) {
            if (visitedNodes.has(nn)) {
                if (nn != visitNode[2]) {
                    // it's from a different origin, reached the answer
                    return visitNode[1] + visitedNodes.get(nn)[1]
                }// it's from the same origin, haven't reached yet
            } else {
                nodesToVisit.push([nn,visitNode[1]+1,visitNode[2]]);
            }
            // if we already visited it, either from the same origin
            // or from another origin.  Don't visit again
        }
        visitedNodes.set(visitNode[0],[visitNode[1],visitNode[2]]);
    }
    // should never reach this spot.
}
