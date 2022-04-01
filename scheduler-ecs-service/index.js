const {ECS} = require("@aws-sdk/client-ecs");

function updateService(ecs, clusterName, desiredCount, service){
    return new Promise((resolve, reject) => {
        var params = {
            cluster: clusterName,
            service: service.name,
            desiredCount: desiredCount
        };

        ecs.updateService(params, function(err, data) {
            if (err) {
                console.log(err, err.stack); // An error occurred
                resolve(`${params.service} not updated`);
            }
            else {
                console.log(data); // Successful response
                resolve(`${params.service} updated => Desired count: ${desiredCount}`)
            }
        });
    });
}

exports.handler = async function(event) {
    let promises = [];
    let desiredCount = event.status == "stop" ? 0: 1;

    event.clusters.forEach(function(cluster){
        let clusterName = cluster.name;
        let ecs = new ECS({ region: cluster.region });

        cluster.services.forEach(function(service){
            promises.push(updateService(ecs, clusterName, desiredCount, service))
        })
    });

    return Promise.all(promises);
}