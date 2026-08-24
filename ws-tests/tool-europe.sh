#!/usr/bin/env bash

export MODEL_VERSION=$(node ../common/scripts/show_version.js)
export MINIO_ACCESS_KEY=minioadmin
export MINIO_SECRET_KEY=minioadmin
export MINIO_ENDPOINT=club.local:9002
export ACCOUNTS_URL=http://club.local:3003
export TRANSACTOR_URL=ws://club.local:3334
export ACCOUNT_DB_URL=postgresql://root@club.local:26258/defaultdb?sslmode=disable
export MONGO_URL=mongodb://club.local:27018
export ELASTIC_URL=http://club.local:9201
export SERVER_SECRET=secret
export DB_URL=postgresql://root@club.local:26258/defaultdb?sslmode=disable

export REGION_INFO="|America;europe|" # Europe without name will not be available for creation of new workspaces.
export TRANSACTOR_URL="ws://club.local:3334;ws://club.local:3334,ws://club.local:3335;ws://club.local:3335;europe,"
export QUEUE_CONFIG=club.local:19093

# Check if local bundle.js exists and use it if available
BUNDLE_PATH="../dev/tool/bundle/bundle.js"
if [ -f "./bundle.js" ]; then
  BUNDLE_PATH="./bundle.js"
fi

node ${TOOL_OPTIONS} --max-old-space-size=8096 $BUNDLE_PATH $@