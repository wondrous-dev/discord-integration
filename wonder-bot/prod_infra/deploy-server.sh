#!/bin/bash
if [ $# != 1 ] ; then
    echo "USAGE: $0 version"
    exit 1;
fi
cd ~/discord-integration/wonder-bot/


echo ">>>>>>>>>>>>>>Deploy image version $1 to Kubernetes..."


sed -i "s/wonder-discord-bot:VERSION/wonder-discord-bot:$1/g" ./prod_infra/wonder-discord-bot-deployment.yaml

kubectl apply -f ./prod_infra/wonder-discord-bot-deployment.yaml --record

sed -i "s/wonder-discord-bot:$1/wonder-discord-bot:VERSION/g" ./prod_infra/wonder-discord-bot-deployment.yaml

cd ~/discord-integration/wonder-bot/prod_infra

exit 0