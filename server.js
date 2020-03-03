require('dotenv').config()
const getValues = require('./math.js').getValues
const convertStringToUTF8ByteArray = require('./math.js').convertStringToUTF8ByteArray
const vector2matrix = require('./math.js').vector2matrix

var xyz = [];


const genVal = () => {
    process.stdout.write('.')
    let array = [];
    for (var i = 0; i < 512 * 3; i++)
        array.push(Math.random())

    xyz = vector2matrix(array)
    let values = getValues(xyz);
    console.log(values)
}


if (process.env.MODE == 'serial') {
    const SerialPort = require('serialport')
    const port = new SerialPort('/dev/ttyUSB0', {
        baudRate: 500000
    })
    const Readline = require('@serialport/parser-readline')
    const parser = port.pipe(new Readline({
        delimiter: [0x5e, 0xc0]
    }))

    parser.on('data',
        function (bucket) {
            if (bucket.length == 1538) {
                let myByteArray = convertStringToUTF8ByteArray(bucket.substring(0, 1536));
                values = getValues(vector2matrix(myByteArray));
            }
        }
    )
} else {
    setInterval(genVal, 3000)
}


const os = require('os')
const b = require('debug')('addTags:b');
const opcua = require("node-opcua");
const tags = require('./tags.json');
var addressSpace, namespace;

let opc_port = process.env.PORT
// Let's create an instance of OPCUAServer
const server = new opcua.OPCUAServer({
    alternateHostname: process.env.HOSTNAME,
    port: opc_port, // the port of the listening socket of the server
    resourcePath: process.env.RESOURCEPATH, // this path will be added to the endpoint resource name
    buildInfo: {
        productName: "seco vibration sensor",
        buildNumber: "7658",
        buildDate: new Date(2020, 2, 29)
    }
});

const addTags = () => {
    b('# Adding TAGS')
    const device = namespace.addFolder("ObjectsFolder", {
        browseName: "Seco Vibration Sensor"
    });

    for (var i = 0; i < tags.length; i++) {

        let nodeId = tags[i].nodeId;
        let browseName = tags[i].browseName;
        let dataType = tags[i].dataType;
        let axis = tags[i].axis;
        let value = RMS[tags[i].axis];

        namespace.addVariable({
            componentOf: device,
            nodeId: nodeId, // a string nodeID
            browseName: browseName,
            dataType: dataType,
            value: {
                get: function () {
                    console.log('...........................................')
                    var idx = tags.findIndex(i => i.nodeId === nodeId);
                    value = RMS[tags[idx].axis]
                    console.log(`value calculated for ${nodeId}: ${value}`);
                    return new opcua.Variant({
                        dataType: dataType,
                        value: value
                    });
                },
                set: function (variant) {
                    if (tags[idx].hasOwnProperty('storedValue')) {
                        console.log('...........................................')
                        console.log(`value set for ${nodeId}: ${variant.value}`);
                        tags[idx].storedValue = parseInt(variant.value);
                        return opcua.StatusCodes.Good;
                    } else return opcua.statusCodes.Bad
                }
            }
        });
    }
}

const construct_my_address_space = () => {
    addressSpace = server.engine.addressSpace;
    namespace = addressSpace.getOwnNamespace();
}

const g = () => {
    const endpointUrl = server.endpoints[0].endpointDescriptions()[0].endpointUrl;
    console.log(`Server ${endpointUrl} is now listening ... ( press CTRL+C to stop)`);

}

const f = () => {
    console.log("Initialize server now... ")
    construct_my_address_space();
    addTags();
    server.start(g)
}

//server.initialize(f)