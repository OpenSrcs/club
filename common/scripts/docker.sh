#!/bin/bash
# Supports minified mode for resource-constrained dev machines:
#   rush docker --minified   or   rush docker:min

MINIFIED=false
for arg in "$@"; do
  if [ "$arg" = "--minified" ]; then
    MINIFIED=true
    break
  fi
done

if [ "$MINIFIED" = true ]; then
  echo "Building minified docker images (excluding optional services)..."
  rush docker:build -p 20 \
    --to @opensrcs/pod-server \
    --to @opensrcs/pod-front \
    --to @opensrcs/prod \
    --to @opensrcs/pod-account \
    --to @opensrcs/pod-workspace \
    --to @opensrcs/pod-collaborator \
    --to @opensrcs/tool \
    --to @opensrcs/pod-analytics-collector \
    --to @opensrcs/rekoni-service \
    --to @opensrcs/pod-datalake \
    --to @opensrcs/pod-export \
    --to @opensrcs/pod-media \
    --to @opensrcs/pod-external
else
  rush docker:build -p 20 \
    --to @opensrcs/pod-server \
    --to @opensrcs/pod-front \
    --to @opensrcs/prod \
    --to @opensrcs/pod-account \
    --to @opensrcs/pod-workspace \
    --to @opensrcs/pod-collaborator \
    --to @opensrcs/tool \
    --to @opensrcs/pod-print \
    --to @opensrcs/pod-sign \
    --to @opensrcs/pod-analytics-collector \
    --to @opensrcs/rekoni-service \
    --to @opensrcs/pod-ai-bot \
    --to @opensrcs/import-tool \
    --to @opensrcs/pod-stats \
    --to @opensrcs/pod-fulltext \
    --to @opensrcs/pod-love \
    --to @opensrcs/pod-mail \
    --to @opensrcs/pod-datalake \
    --to @opensrcs/pod-mail-worker \
    --to @opensrcs/pod-export \
    --to @opensrcs/pod-media \
    --to @opensrcs/pod-preview \
    --to @opensrcs/pod-link-preview \
    --to @opensrcs/pod-external \
    --to @opensrcs/pod-backup \
    --to @opensrcs/backup-api-pod \
    --to @opensrcs/pod-billing \
    --to @opensrcs/pod-process \
    --to @opensrcs/pod-rating \
    --to @opensrcs/pod-payment \
    --to @opensrcs/pod-worker \
    --to @opensrcs/pod-events-processor
fi
