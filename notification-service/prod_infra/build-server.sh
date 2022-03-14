#!/bin/bash
if [ $# != 1 ] ; then
    echo "USAGE: $0 version"
    exit 1;
fi

cd ~/discord-integration/notification-service/

docker build -t discord-notification-service -f ./prod_infra/Dockerfile .

docker tag discord-notification-service:latest gcr.io/wondrous-1587456307075/discord-notification-service:$1

docker push gcr.io/wondrous-1587456307075/discord-notification-service:$1

cd ~/discord-integration/notification-service/prod_infra

exit 0;