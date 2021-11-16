#!/bin/bash
source $CODEBUILD_SRC_DIR/scripts/parse_variables.sh
which kubectl >& /dev/null
KUBE=$?
which helm >& /dev/null
HELM=$?
if [ ${KUBE}${HELM} == 00 ]
    then
    echo "1 - Verifying deployment..."

    # Parse input build json file for parameters
    parseInput
    echo tag=$TAG repository=$REPO cluster=$CLUSTER deployment=$RELEASE

    # Update kubeconfig
    aws eks --region $REGION update-kubeconfig --name $CLUSTER

    # Verify deployment
    kubectl get deployment $RELEASE -n $NAMESPACE -o json > out.json
    PROGRES=`jq '.spec.progressDeadlineSeconds' out.json`
    echo "3 - Waiting for $PROGRES seconds"
    
    # Wait for ProgressDeadline Seconds
    sleep $PROGRES
    # Check for rollout status
    echo "4 - Deployment status :-"
    kubectl -n $NAMESPACE rollout status deployment $RELEASE

    if [ 0 -lt $? ]
        then
            echo -e "5 - Deployment failed, rolling back to previous release..."
            helm rollback $RELEASE 0 -n $NAMESPACE
            exit 1
        else 
            echo "5 - Deployment succeeded.."
    fi
  else
    echo " ========================================================="
    echo "KUBECTL & HELM not installed"
    echo "========================================================="
    exit 1
  fi