# sheduler-ecs-service

## Permissions

* AmazonECS_FullAccess

## Triggers

### Start Services

```json
{
    "status": "start",
    "clusters": [
        {
            "name": "cluster-name",
            "region": "region",
            "services": [
                {
                    "name": "service-name-01"
                },
                {
                    "name": "service-name-02"
                },
                {
                    "name": "service-name-03"
                }
            ]
        }
    ]
}
```

### Stop Services

```json
{
    "status": "stop",
    "clusters": [
        {
            "name": "cluster-name",
            "region": "region",
            "services": [
                {
                    "name": "service-name-01"
                },
                {
                    "name": "service-name-02"
                },
                {
                    "name": "service-name-03"
                }
            ]
        }
    ]
}
```

# scheduler-rds-instance

## Permissions

* AmazonRDSFullAccess

## Triggers

### Start Instance

```json
{
    "region": "region",
    "command": "start",
    "instances": [
        {
            "dbInstanceIdentifier": "database-name"
        }
    ]
}
```

### Stop Instance

```json
{
    "region": "region",
    "command": "stop",
    "instances": [
        {
            "dbInstanceIdentifier": "database-name"
        }
    ]
}
```