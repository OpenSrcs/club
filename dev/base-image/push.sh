#!/usr/bin/env bash

# Default version if not set
VERSION=${VERSION:-"latest"}

docker push opensrcs/base:${VERSION}
docker push opensrcs/base-slim:${VERSION}
docker push opensrcs/rekoni-base:${VERSION}
docker push opensrcs/print-base:${VERSION}
docker push opensrcs/front-base:${VERSION}
docker push opensrcs/preview-base:${VERSION}
