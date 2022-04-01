const { RDSClient, StopDBInstanceCommand, StartDBInstanceCommand  } = require("@aws-sdk/client-rds")

function updateDBInstance(command, rds, instance){
    return new Promise((resolve, reject) => {
        let params = { DBInstanceIdentifier: instance.dbInstanceIdentifier }
        let rdsCommand = command == 'stop' ? new StopDBInstanceCommand(params): new StartDBInstanceCommand(params);

        rds.send(rdsCommand, function(err, data) {
            if (err) {
                console.log(err, err.stack); // An error occurred
                resolve(`${params.DBInstanceIdentifier} not updated`);
            }
            else {
                console.log(data); // Successful response
                resolve(`${params.DBInstanceIdentifier} updated => command: ${instance.command}`)
            }
        })
    })
}

exports.handler = async function(event){
    let promises = [];
    let region = event.region;
    let command = event.command;

    event.instances.forEach(function(instance){
        let rds = new RDSClient({ region: region });
        promises.push(updateDBInstance(command, rds, instance));
    });

    return await Promise.all(promises);
    
}