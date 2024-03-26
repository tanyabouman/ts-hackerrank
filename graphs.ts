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
