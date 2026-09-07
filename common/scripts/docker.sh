#!/bin/bash
# Supports minified mode for resource-constrained dev machines:
#   rush docker --minified   or   rush docker:min

MINIFIED=false
FULL=false
for arg in "$@"; do
  if [ "$arg" = "--minified" ]; then
    MINIFIED=true
  fi
  if [ "$arg" = "--full" ]; then
    FULL=true
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

# The integrations that docker-compose.full.yaml wires up are not part of the
# default image set, so `rush docker:build` alone leaves them missing.
if [ "$FULL" = true ]; then
  echo "Building integration images for the full stack..."
  rush docker:build -p 20 \
    --to @opensrcs/pod-gmail \
    --to @opensrcs/pod-calendar \
    --to @opensrcs/pod-calendar-mailer \
    --to @opensrcs/pod-github \
    --to @opensrcs/pod-telegram-bot \
    --to @opensrcs/pod-notification \
    --to @opensrcs/pod-translate
fi
