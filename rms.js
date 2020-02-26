const rms = (accumulator, currentValue) => accumulator + currentValue * currentValue;

var RMS = {
  "x": 0,
  "y": 0,
  "z": 0
};

const calcRMS = (readings) => {
  var x, y, z;
  var xs = [],
    ys = [],
    zs = [];

  for (var i = 0; i < process.env.BUFFER_SIZE; i += 6) {
    x = '0x' + readings.substring(i, i + 2);
    y = '0x' + readings.substring(i + 2, i + 4);
    z = '0x' + readings.substring(i + 4, i + 6);

    xs.push(parseInt(x));
    ys.push(parseInt(y));
    zs.push(parseInt(z));
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