require('dotenv').config()
const SerialPort = require('serialport')


const port = new SerialPort('/dev/ttyUSB0', {
    baudRate: 500000
  })
  
const Readline = require('@serialport/parser-readline')
const parser = port.pipe(new Readline({ delimiter: [0x5e, 0xc0]}))
parser.on('data', 
function(x){
console.log('BYTE: ', x.length)}
)

 /*
  port.on('readable', function () {
    console.log('Data:', port.read())
  })
  
  // Switches the port into "flowing mode"
  port.on('data', function (data) {
    console.log('Data:', data[0])
  })
 

const os = require('os')

const a = require('debug')('server.initialize:a');
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
        productName: "hbvu simple server",
        buildNumber: "7658",
        buildDate: new Date(2019, 9, 28)
    }
});

const addTags = () => {
    b('# Adding TAGS')
    const device = namespace.addFolder("ObjectsFolder", {
        browseName: "Fake PLC"
    });

    for (var i = 0; i < tags.length; i++) {

        let nodeId = tags[i].nodeId;
        let browseName = tags[i].browseName;
        let dataType = tags[i].dataType;
        let func = tags[i].func;
        let seed = 0
        if (tags[i].hasOwnProperty(seed))
            seed = tags[i].seed

        let value = 0;

        namespace.addVariable({
            componentOf: device,
            nodeId: nodeId, // a string nodeID
            browseName: browseName,
            dataType: dataType,
            value: {
                get: function () {
                    //var seed = 10 + new Date() / 10000.0;
                    b('...........................................')

                    var idx = tags.findIndex(i => i.nodeId === nodeId);
                    if (tags[idx].hasOwnProperty('func')) {
                        value = eval(func)
                    }
                    b(`value calculated for ${nodeId}: ${value}`);
                    return new opcua.Variant({
                        dataType: dataType,
                        value: value
                    });
                },
                set: function (variant) {
                    if (tags[idx].hasOwnProperty('storedValue')) {
                        b('...........................................')
                            b(`value set for ${nodeId}: ${variant.value}`);
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
    console.log(server);
    const endpointUrl = server.endpoints[0].endpointDescriptions()[0].endpointUrl;
    console.log(`Server ${endpointUrl} is now listening ... ( press CTRL+C to stop)`);

}

const f = () => {
    console.log("initialize server now")
    construct_my_address_space();
    addTags();
    server.start(g)
}

//server.initialize(f)

*/
