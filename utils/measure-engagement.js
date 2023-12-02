const defaultProfile = {}
let cache_xs = []
let cache_ys = []


function cleanCache() {
    cache_xs = []
    cache_ys = []
}

function cacheData({x, y}, size = 50) {
    const xs_len = cache_xs.length
    const ys_len = cache_ys.length
    if (xs_len >= size || ys_len >= size) {
        cache_xs = cache_xs.slice(-(size - 1))
        cache_ys = cache_ys.slice(-(size - 1))
    }
    cache_xs.push(x)
    cache_ys.push(y)
}

function calcMean(arr) {
    return arr.reduce((p, c) => p + c) / arr.length
}

function meanPosition() {
    return {
        x: calcMean(cache_xs),
        y: calcMean(cache_ys)
    }
}

function equidistantPoints(start, end, numPoints) {
    if (numPoints < 2) {
        console.error("Number of points should be at least 2");
        return [];
    }

    const step = (end - start) / (numPoints - 1);
    const points = [];

    for (let i = 0; i < numPoints; i++) {
        const point = start + i * step;
        points.push(point);
    }

    return points;
}

function weightedMeanPosition(weights = null) {
    if (cache_xs.length < 2) {
        return {
            x: cache_xs,
            y: cache_ys,
        }
    }
    if (!weights) {
        weights = equidistantPoints(0, 1, cache_xs.length)
    }
    let wmp_x = 0
    let wmp_y = 0
    for (let i = 0; i <= cache_xs.length - 1; i++) {
        wmp_x += cache_xs[i] * weights[i]
        wmp_y += cache_ys[i] * weights[i]
    }
    const s = weights.reduce((p, c) => p + c, 0)
    return {
        x: wmp_x / s,
        y: wmp_y / s
    }
}


function meanInducedMomentum(){
    const m = meanPosition()
    const mw = weightedMeanPosition()
    return{
        x: mw.x - m.x,
        y: mw.y - m.y
    }
}

export function measureEngagement(environment, userInputs, profile = defaultProfile,) {

    //console.log(userInputs, environment)
    cacheData(userInputs)
    //console.log(cache_xs)

    console.log(meanInducedMomentum())
}


