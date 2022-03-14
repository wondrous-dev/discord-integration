#!/bin/bash
if [ $# != 1 ] ; then
    echo "USAGE: $0 version"
    exit 1;
fi
cd ~/discord-integration/notification-service/


echo ">>>>>>>>>>>>>>Deploy image version $1 to Kubernetes..."


sed -i "s/discord-notification-service:VERSION/discord-notification-service:$1/g" ./prod_infra/discord-notification-deployment.yaml

kubectl apply -f ./prod_infra/discord-notification-deployment.yaml --record

sed -i "s/discord-notification-service:$1/discord-notification-service:VERSION/g" ./prod_infra/discord-notification-deployment.yaml

cd ~/discord-integration/notification-service/prod_infra

exit 0