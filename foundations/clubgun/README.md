# Clubgun
Clubgun is a worker that routes Club communication event requests from Apache Kafka topic(s) to Club transactors.

## Operation
Clubgun consumes messages from specified topics. It inspects the message for __AccountUid__ header and uses it's value to determine the transactor to which the request should be routed. If the transactor is not found in the cache, it will be looked up in the Club accounts service. The transactor is then cached for future use (forever).

Complete message body is send to the transactor's ```/api/v1/event/{WorkspaceUid}``` endpoint. If the HTTP request fails and the error is classfied as transient (5xx), several more retries are made with exponential backoff. At this point, backoff parameters are hardcoded and are not configurable.

Clubgun authenticates requests with JWT. Token claims are built ofh the system account id, workspace id and service name. Club secret is used to sign JWT's.

Clubgun employs a limiter to control the rate at which transactor requests are made. The limiter is global (the same for all transactors) and limits the number of requests per second. 

## Configuration
The following environment variables are used to configure Clubgun:

- ```CLUB_GROUP_ID``` - Kafka consumer group id. Default: clubgun
- ```CLUB_TOPICS``` - Comma separated list of Kafka topics to consume from. Default: ["clubgun"]
- ```CLUB_KAFKA_BOOTSTRAP``` - Comma separated list of bootstrap Kafka brokers. Default: localhost:19092
- ```CLUB_SECRET``` - Club secret used to sign requests to account service and transactors. Default: secret
- ```CLUB_ACCOUNTS_SERVICE``` - URL of the Club accounts service. Default: http://localhost:8080/account
- ```CLUB_SERVICE_ID``` - Club service id. Default: clubgun
- ```CLUB_RATE_LIMIT``` - Maximal request rate per transactor. Default: 10 (requests per second)
- ```CLUB_DRY_RUN``` - Dry run mode. If set to true, no requests are sent to transactors and consumed messages are not commited. Default: false

## IMPORTANT
It is __strongly__ recommened to use ```CardID``` as a message key. This will ensure that all messages for the card are processed in the correct order. 

## Further steps
- [ ] Limit requests per transactor (currently limiter is global)
- [ ] More flexibale error classification 
- [ ] Support for temprary unavailable workspaces (i.e. in migration state)

## License
This project is licensed under EPL-2.0
