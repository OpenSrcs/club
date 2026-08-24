export MODEL_VERSION=$(node ../common/scripts/show_version.js)
export MINIO_ACCESS_KEY=minioadmin
export MINIO_SECRET_KEY=minioadmin
export MINIO_ENDPOINT=club.local:9000
export MONGO_URL=mongodb://club.local:27017
export DB_URL=mongodb://club.local:27017
export ACCOUNT_DB_URL=postgresql://root@club.local:26257/defaultdb?sslmode=disable
export ACCOUNTS_URL=http://club.local:3000
export TRANSACTOR_URL=ws://club.local:3333
export ELASTIC_URL=http://club.local:9200
export SERVER_SECRET=secret
export QUEUE_CONFIG=club.local:19093

# Restore workspace contents in mongo/elastic
node ../dev/tool/bundle/bundle.js $@