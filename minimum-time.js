// https://www.hackerrank.com/challenges/minimum-time-required/problem
function minTime(machines, goal) {

    // think about this as a search problem
    // if we know the upper bound, and checking
    // a solution only costs n, then that would
    // be n*log(max(days))

    // maximum number of days is goal*MAX(machine[i])
    // is it worthwhile to search for that?? Works.

    // cost to find: O(n)
    let maxMachine = Math.max(...machines);

    function isFinished(days) {
        let items = 0;
        for (let i = 0; i<machines.length; i++) {
            items += Math.floor(days/machines[i]);
        }
        return items >= goal;
    }

    // cost to binary search: n*log(goal*maxMachine)
    let lo = 0;
    let hi = goal*maxMachine;
    let mid = Math.floor((hi+lo)/2);
    while (mid < hi) {
        if (isFinished(mid)) {
            hi = mid;
        } else {
            lo = mid;
        }
        mid = Math.ceil((hi+lo)/2);
    }

    // First attempt: five cases are too slow
    // n*days
    // max days: 10^18
    // MAX: 10^5*10^18 = 10^23
    /*
    let machinesRunning = machines.slice();
    let completed = 0;
    let days = 0;
    while (completed < goal) {
        for (let i = 0; i < machinesRunning.length; i++) {
            machinesRunning[i]--;
            if (machinesRunning[i] == 0) {
                machinesRunning[i] = machines[i];
                completed++;
            }
        }
        days++;
    }
    */
    return days;

}
