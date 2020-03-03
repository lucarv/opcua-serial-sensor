var stddev = {"x":0, "y":0,"z":0}
var p2p = {"x":0, "y":0,"z":0}
var avg = {"x":0, "y":0,"z":0}
var calculatedValues = {stddev, p2p, avg, "maxvector": 0, "stddevvector": 0, "avgvector": 0};


const convertStringToUTF8ByteArray = (str) => {
    let binaryArray = new Int8Array(str.length)
    Array.prototype.forEach.call(binaryArray, function (el, idx, arr) {
        arr[idx] = str.charCodeAt(idx)
    })
    return binaryArray
}

const vector2matrix = (vector) => {
    var x = [], y = [], z = [], matrix = [];
    for (var i = 0; i < vector.length; i += 3) {
        x.push(vector[i])
        y.push(vector[i + 1])
        z.push(vector[i + 2])
    }

    matrix.push(x);matrix.push(y);matrix.push(z);
   return matrix;

}

/*
const calcRMS = (values) => {
    console.log(" - RMS - ")

    let array = []
    for (var i = 0; i < 3; i++) {
        let Squares = values[i].map((val) => (val * val));
        let Sum = Squares.reduce((acum, val) => (acum + val));
        let Mean = Sum / values[i].length;
        array[i] = Mean;
        console.log(Mean)
    }
    RMS.x = array[0]
    RMS.y = array[1]
    RMS.z = array[2]

    console.log(RMS);
    return RMS
};
*/
const calcPeak2Peak = (values) => {
    let l = values.length

    let array = [0,0,0,0,0,0]
    for (var i = 0; i < l; i++) {
        array[i] = Math.max(...values[i])
        array[i + 3] = Math.min(...values[i])
    }
    calculatedValues.maxvector = Math.sqrt((array[0] * array[0]) + (array[1] * array[1]) + (array[2] * array[2]))
    p2p.x = array[0] - array[3]; p2p.y = array[1] - array[4]; p2p.z = array[2] - array[5];
};

const getStdDev = (values) => {

    stddev.x = calcStdDev(values[0]);
    stddev.y = calcStdDev(values[1]);
    stddev.z = calcStdDev(values[2]);

    calculatedValues.stddevvector = Math.sqrt((stddev.x  * stddev.x) + (stddev.y  * stddev.y) + (stddev.z * stddev.z))

}

const calcStdDev = (values) => {
    var avg = average(values);

    var squareDiffs = values.map(function (value) {
        var diff = value - avg;
        var sqrDiff = diff * diff;
        return sqrDiff;
    });

    var avgSquareDiff = average(squareDiffs);

    var stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
}

const average = (data) => {

    var sum = data.reduce(function (sum, value) {
        return sum + (value * value);
    }, 0);

    var avg = sum / data.length;
    return avg;
}

const getValues = (sensor_readings) => {
    getStdDev(sensor_readings)
    calcPeak2Peak(sensor_readings)
    avg.x = average(sensor_readings[0]);
    avg.y = average(sensor_readings[1]);
    avg.z = average(sensor_readings[2]);

    calculatedValues.avgvector = Math.sqrt((avg.x * avg.x) + (avg.y * avg.y) + (avg.z * avg.z))

    return calculatedValues;
}

module.exports.getValues = getValues;
module.exports.convertStringToUTF8ByteArray = convertStringToUTF8ByteArray
module.exports.vector2matrix = vector2matrix