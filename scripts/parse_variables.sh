#!/bin/bash
function parseInput {
    echo "2. parsing input build file"

    REGISTRY=$(echo `jq '.registry' build.json` | sed -e 's/^"//' -e 's/"$//')
    REPO=$(echo `jq '.repository' build.json` | sed -e 's/^"//' -e 's/"$//')
    TAG=$(echo `jq '.tag' build.json` | sed -e 's/^"//' -e 's/"$//')
    RELEASE=$(echo `jq '.release' build.json` | sed -e 's/^"//' -e 's/"$//')
    CLUSTER=$(echo `jq '.cluster' build.json` | sed -e 's/^"//' -e 's/"$//')
    REGION=$(echo `jq '.region' build.json` | sed -e 's/^"//' -e 's/"$//')
    NAMESPACE=$(echo `jq '.namespace' build.json` | sed -e 's/^"//' -e 's/"$//')
}
