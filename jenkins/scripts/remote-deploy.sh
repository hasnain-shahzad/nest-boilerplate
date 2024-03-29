#!/bin/sh


#=====================================
# HOST_IP  controlled by jenkins env
# HOST_USER controlled by jenkins envs
# PORT controlled by jenkins envs
#=====================================

# Get current git commit number
LABEL=$(git log -1 --format=%h)

CONTAINER_NAME=sofit-backend
CONTAINER_CURRENT=sofit/$CONTAINER_NAME:$LABEL
    docker stop $CONTAINER_NAME-$BRANCH_NAME
    docker rm -f $CONTAINER_NAME-$BRANCH_NAME
    docker run -v /var/sofit/.env:/app/.env -d -p $PORT:4000 -p 3002:3002 --name $CONTAINER_NAME-$BRANCH_NAME $CONTAINER_CURRENT
