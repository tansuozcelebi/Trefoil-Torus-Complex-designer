#!/usr/bin/env bash
#
# server-deploy.sh — Runs ON the remote server.
#
# This script is streamed and executed by deploy/deploy.sh (and by the
# GitHub Actions workflow). It can also be run directly on the server.
#
# It expects the following environment variables (deploy.sh sets them):
#   REMOTE_DIR     - where the repo lives on the server
#   REPO_URL       - git URL to clone if the repo isn't there yet
#   DEPLOY_BRANCH  - branch to deploy
#   HOST_PORT      - host port to publish (passed to docker compose)
#   MODE           - "deploy" (default) or "setup" (provision Docker first)
#
set -euo pipefail

REMOTE_DIR="${REMOTE_DIR:-/opt/trefoil-torus-complex}"
REPO_URL="${REPO_URL:-https://github.com/tansuozcelebi/Trefoil-Torus-Complex-designer.git}"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-main}"
HOST_PORT="${HOST_PORT:-8080}"
MODE="${MODE:-deploy}"

log() { echo "[server-deploy] $*"; }

# --- Optional one-time provisioning -----------------------------------------
if [[ "$MODE" == "setup" ]]; then
  log "Setup mode: ensuring Docker is installed..."
  if ! command -v docker >/dev/null 2>&1; then
    log "Installing Docker via get.docker.com..."
    curl -fsSL https://get.docker.com | sh
    sudo usermod -aG docker "$USER" || true
    log "Docker installed. You may need to re-login for group changes to apply."
  else
    log "Docker already present: $(docker --version)"
  fi
fi

# --- Pick a docker compose command ------------------------------------------
if docker compose version >/dev/null 2>&1; then
  COMPOSE=(docker compose)
elif command -v docker-compose >/dev/null 2>&1; then
  COMPOSE=(docker-compose)
else
  log "ERROR: docker compose is not available on this server." >&2
  log "Run the deploy with --setup, or install Docker manually." >&2
  exit 1
fi

# --- Clone or update the repository -----------------------------------------
if [[ ! -d "$REMOTE_DIR/.git" ]]; then
  log "Cloning $REPO_URL into $REMOTE_DIR ..."
  mkdir -p "$REMOTE_DIR"
  git clone "$REPO_URL" "$REMOTE_DIR"
fi

cd "$REMOTE_DIR"

log "Fetching latest from origin/$DEPLOY_BRANCH ..."
git fetch --prune origin "$DEPLOY_BRANCH"
git checkout "$DEPLOY_BRANCH"
git reset --hard "origin/$DEPLOY_BRANCH"

# Ensure an .env exists for docker compose (uses example as a baseline).
if [[ ! -f .env && -f .env.example ]]; then
  log "No .env found; seeding from .env.example"
  cp .env.example .env
fi

# Export HOST_PORT so docker-compose.yml picks it up.
export HOST_PORT

# --- Build and (re)start the stack ------------------------------------------
log "Building image (no cache layers reused only when changed)..."
"${COMPOSE[@]}" build

log "Starting containers..."
"${COMPOSE[@]}" up -d

# --- Cleanup dangling images to save disk -----------------------------------
log "Pruning dangling images..."
docker image prune -f >/dev/null 2>&1 || true

# --- Health check -----------------------------------------------------------
log "Waiting for health endpoint on localhost:${HOST_PORT} ..."
ok=0
for i in $(seq 1 15); do
  if curl -fsS "http://localhost:${HOST_PORT}/health" >/dev/null 2>&1; then
    ok=1
    break
  fi
  sleep 2
done

if [[ "$ok" == "1" ]]; then
  log "Health check passed. Deployment successful."
else
  log "WARNING: health check did not pass in time. Recent logs:" >&2
  "${COMPOSE[@]}" logs --tail=40 || true
  exit 1
fi

log "Current status:"
"${COMPOSE[@]}" ps
