#!/bin/bash

DOCKER_APP_NAME=backend

EXIST_BLUE=$(docker-compose -p ${DOCKER_APP_NAME}-blue -f ./src/backend/docker-compose.blue.yml ps | grep Up)

if [ -z "$EXIST_BLUE" ]; then
    echo "blue up"
    docker-compose -p ${DOCKER_APP_NAME}-blue -f ./src/backend/docker-compose.blue.yml up -d --build

    sleep 10

    docker-compose -p ${DOCKER_APP_NAME}-green -f ./src/backend/docker-compose.green.yml down
else
    echo "green up"
    docker-compose -p ${DOCKER_APP_NAME}-green -f ./src/backend/docker-compose.green.yml up -d --build

    sleep 10

    /usr/local/bin/docker-compose -p ${DOCKER_APP_NAME}-blue -f ./src/backend/docker-compose.blue.yml down
fi