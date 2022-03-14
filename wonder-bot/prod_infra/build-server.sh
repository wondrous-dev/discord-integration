#!/bin/bash
if [ $# != 1 ] ; then
    echo "USAGE: $0 version"
    exit 1;
fi

cd ~/discord-integration/wonder-bot/

docker build -t wonder-discord-bot -f ./prod_infra/Dockerfile .

docker tag wonder-discord-bot:latest gcr.io/wondrous-1587456307075/wonder-discord-bot:$1

docker push gcr.io/wondrous-1587456307075/wonder-discord-bot:$1

cd ~/discord-integration/wonder-bot/prod_infra

exit 0;