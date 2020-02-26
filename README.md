# PLC SIMULATOR

Based on [node-opcua](http://node-opcua.github.io/) all kudos due

This script will let you simulate a PLC by entering tags on the tags.json file.
```
[
    {
        "nodeId": "s=010",
        "browseName": "your tag name",
        "dataType": "Int32", // any valid OPC-UA data type
        "func": "seed + 1", // a string containing a function that will generate the nodeId value
        "seed": 100 // a seed to the function 'func' above
    }
    ...
]
```

## Get started (local deployement) 
1. clone
2. set three env vars, one called HOSTNAME (set it to your OPC-UA IP or FQDN), one called PORT (the port you want your OPC-UA clients to connect) and one for your OPC UA resource path called RESOURCEPATH (e.g /myRA)
3. edit the tags.json
4. start the script (DEBUG=* if you want to see what the server is doing)

## Set it as a container instance on Azure 
1. Use the Dockerfile in this repo to create your image  
2. Push it to Azure  
3. Create one (or more) Container Instances (below is an example)

```
az container create --resource-group YOUR_RG_NAME ddmstatusapp --image YOUR_IMAGE_LOCATION_IN_ITS_REGISTRY --cpu 1 --memory 1 --registry-login-server YOUR_REGISTRY_URL --registry-username YOUR_REGISTRY_USERNAME --registry-password YOUR_REGISTRY_PASSWORD --dns-name-label A_LABEL_FOR_DNS --ports THE_PORT_YOU_RUN_THE_OPC_STACK_ON
```
### Extra note
if you want to change the tags.json without having to rebuild the image, you can mount an exteranl volume when creating the continer instance like shown [here](https://docs.microsoft.com/en-us/azure/container-instances/container-instances-volume-azure-files)