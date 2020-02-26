const rms = (accumulator, currentValue) => accumulator + currentValue * currentValue;

var RMS = {
  "x": 0,
  "y": 0,
  "z": 0
};

const calcRMS = (readings) => {
    cxonasole.log(readings)
  var x, y, z;
  var xs = [],
    ys = [],
    zs = [];

  for (var i = 0; i < 512; i += 3) {

    xs.push(readings[i]);
    ys.push(readings[i + 1]);
    zs.push(readings[i + 2]);
  }


  if (xs.length > 0) {
    x = xs.reduce(rms) / xs.length;
    RMS.x = Math.sqrt(x) - (Math.random() * 5) + 1;
  }
  if (ys.length > 0) {
    y = ys.reduce(rms) / ys.length;
    RMS.y = Math.sqrt(y) - (Math.random() * 5) + 1;

  }
  if (zs.length > 0) {
    z = zs.reduce(rms) / zs.length;
    RMS.z = Math.sqrt(z) - (Math.random() * 5) + 1;
  }

  return RMS;
};

module.exports.calcRMS = calcRMS