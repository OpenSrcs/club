#!/usr/bin/env bash

# Fail on the first failing image build rather than silently exiting with the
# status of the last one - a partial build must not report success.
set -euo pipefail

# Default version if not set
VERSION=${VERSION:-"latest"}

docker build -t opensrcs/base:${VERSION} -t opensrcs/base:latest -f base.Dockerfile ${DOCKER_EXTRA:-} .
docker build -t opensrcs/base-slim:${VERSION} -f slim.Dockerfile ${DOCKER_EXTRA:-} .
docker build -t opensrcs/rekoni-base:${VERSION} -f rekoni.Dockerfile ${DOCKER_EXTRA:-} .
docker build -t opensrcs/print-base:${VERSION} -f print.Dockerfile ${DOCKER_EXTRA:-} .
docker build -t opensrcs/front-base:${VERSION} -f front.Dockerfile ${DOCKER_EXTRA:-} .
docker build -t opensrcs/preview-base:${VERSION} -f preview.Dockerfile ${DOCKER_EXTRA:-} .