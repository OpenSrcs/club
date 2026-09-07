#!/usr/bin/env bash
#
# Build the container images that Rush does NOT build.
#
# `rush docker:build` only covers the TypeScript projects in the workspace. The
# Rust services under foundations/ (and the Go `stream` service) are ordinary
# Cargo/Go projects with their own Dockerfiles, so they have to be built with
# plain `docker build`. docker-compose.yaml references the resulting images by
# name (opensrcs/clubkvs, opensrcs/clublake, ...), which is why the stack fails
# to come up with "image not found" if this script has never been run.
#
# The five Rust services depend on the shared `clubrs` crate through a relative
# path dependency (`clubrs = { path = "../clubrs" }`). That path escapes the
# build context, so each build gets clubrs injected as a *named build context*
# and the Dockerfile pulls it in with `COPY --from=clubrs`.
#
# Usage:
#   ./common/scripts/docker_native.sh              # build everything
#   ./common/scripts/docker_native.sh clubkvs      # build a subset
#   VERSION=1.2.3 ./common/scripts/docker_native.sh
#
# A partial build must never report success. But aborting the whole run on the
# first failure is too blunt here: these are long Rust builds and a single flaky
# crates.io download should not cost you the images that would have succeeded.
# So keep going, remember what failed, and exit non-zero with a summary.
set -uo pipefail

cd "$(dirname "$0")/../.."
ROOT="$(pwd)"

VERSION=${VERSION:-latest}
CLUBRS="${ROOT}/foundations/clubrs"

# name | context | dockerfile (relative to context) | needs clubrs
SERVICES=(
  "clubkvs|foundations/clubkvs|clubkvs_server/Dockerfile|yes"
  "clublake|foundations/clublake|Dockerfile|yes"
  "clubpulse|foundations/clubpulse|Dockerfile|yes"
  "clubgun|foundations/clubgun|Dockerfile|yes"
  "clubgram|foundations/clubgram|Dockerfile|yes"
  "club-ai-agent|foundations/club-ai-agent|Dockerfile|yes"
  "stream|foundations/stream|Dockerfile|no"
)

# Restrict to the names passed on the command line, if any.
WANTED=("$@")
should_build() {
  [ ${#WANTED[@]} -eq 0 ] && return 0
  local candidate="$1" want
  for want in "${WANTED[@]}"; do
    [ "$want" = "$candidate" ] && return 0
  done
  return 1
}

built=()
failed=()
for entry in "${SERVICES[@]}"; do
  IFS='|' read -r name context dockerfile needs_clubrs <<< "$entry"
  should_build "$name" || continue

  echo ""
  echo "==> Building opensrcs/${name}:${VERSION}  (context: ${context})"

  args=(build
    -t "opensrcs/${name}:${VERSION}"
    -t "opensrcs/${name}:latest"
    -f "${ROOT}/${context}/${dockerfile}")

  if [ "$needs_clubrs" = "yes" ]; then
    args+=(--build-context "clubrs=${CLUBRS}")
  fi

  args+=("${ROOT}/${context}")

  if docker "${args[@]}"; then
    built+=("opensrcs/${name}:${VERSION}")
  else
    echo "!!! FAILED: opensrcs/${name}"
    failed+=("opensrcs/${name}")
  fi
done

echo ""
if [ ${#built[@]} -eq 0 ] && [ ${#failed[@]} -eq 0 ]; then
  echo "Nothing matched: ${WANTED[*]}"
  exit 1
fi

if [ ${#built[@]} -gt 0 ]; then
  echo "Built ${#built[@]} image(s):"
  printf '  %s\n' "${built[@]}"
fi

if [ ${#failed[@]} -gt 0 ]; then
  echo ""
  echo "FAILED ${#failed[@]} image(s):"
  printf '  %s\n' "${failed[@]}"
  echo ""
  echo "Rust builds pull a lot from crates.io; a download timeout is usually"
  echo "transient. Retry just the failures, e.g.:"
  echo "  ./common/scripts/docker_native.sh ${failed[*]//opensrcs\//}"
  exit 1
fi
