#!/bin/bash
source $CODEBUILD_SRC_DIR/scripts/parse_variables.sh
which kubectl >& /dev/null
KUBE=$?
which helm >& /dev/null
HELM=$?
if [ ${KUBE}${HELM} == 00 ]
    then
    echo "1. Starting deployment..."

    # Parse input build json file for parameters
    parseInput
    echo tag=$TAG repository=$REPO cluster=$CLUSTER deployment=$RELEASE

    # Update kubeconfig
    aws eks --region $REGION update-kubeconfig --name $CLUSTER

    # Check existence of the release on k8s
    DEPSTATUS=$(echo $(helm status $RELEASE -n $NAMESPACE) | awk '{print $1;}')
    if [ $DEPSTATUS == 'NAME:' ]
    then
        echo "Release is found..so updating the release"
        # Upgrade release on k8s
        helm upgrade $RELEASE ./k8s/frontend-chart --set image.registry=$REGISTRY --set image.repository=$REPO --set image.tag=$TAG -n $NAMESPACE
    else 
        echo "Release is not found..so installing new release"
        # Install release on k8s
        helm install $RELEASE ./k8s/frontend-chart --set image.registry=$REGISTRY --set image.repository=$REPO --set image.tag=$TAG -n $NAMESPACE
    fi
  else
    echo "========================================================="
    echo "KUBECTL & HELM not installed"
    echo "========================================================="
    exit 1
  fi