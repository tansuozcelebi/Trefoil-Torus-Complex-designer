#!/usr/bin/env bash
#
# deploy.sh — Trigger a remote deployment over SSH.
#
# Reads connection details from deploy/deploy.env (see deploy.env.example),
# connects to the server, and runs the server-side deploy script which pulls
# the latest code and rebuilds the Docker stack.
#
# Usage:
#   ./deploy/deploy.sh            # deploy the configured branch
#   ./deploy/deploy.sh --setup    # provision the server for the first time
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="${SCRIPT_DIR}/deploy.env"

# Allow overriding the env file: DEPLOY_ENV=path ./deploy/deploy.sh
ENV_FILE="${DEPLOY_ENV:-$ENV_FILE}"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "ERROR: $ENV_FILE not found." >&2
  echo "Copy deploy/deploy.env.example to deploy/deploy.env and fill it in." >&2
  exit 1
fi

# shellcheck disable=SC1090
set -a; source "$ENV_FILE"; set +a

: "${SSH_HOST:?SSH_HOST is required in deploy.env}"
: "${SSH_USER:?SSH_USER is required in deploy.env}"
SSH_PORT="${SSH_PORT:-22}"
REMOTE_DIR="${REMOTE_DIR:-/opt/trefoil-torus-complex}"
REPO_URL="${REPO_URL:-https://github.com/tansuozcelebi/Trefoil-Torus-Complex-designer.git}"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-main}"
HOST_PORT="${HOST_PORT:-8080}"

SSH_OPTS=(-p "$SSH_PORT" -o StrictHostKeyChecking=accept-new)
if [[ -n "${SSH_KEY:-}" ]]; then
  # Expand a leading ~ to the home directory.
  SSH_KEY="${SSH_KEY/#\~/$HOME}"
  SSH_OPTS+=(-i "$SSH_KEY")
fi

MODE="deploy"
if [[ "${1:-}" == "--setup" ]]; then
  MODE="setup"
fi

echo "==> Target: ${SSH_USER}@${SSH_HOST}:${SSH_PORT}"
echo "==> Remote dir: ${REMOTE_DIR}"
echo "==> Branch: ${DEPLOY_BRANCH}  Port: ${HOST_PORT}"
echo "==> Mode: ${MODE}"

# Stream the server-side script over SSH and execute it remotely.
# Variables are exported into the remote shell environment.
ssh "${SSH_OPTS[@]}" "${SSH_USER}@${SSH_HOST}" \
  "REMOTE_DIR='${REMOTE_DIR}' REPO_URL='${REPO_URL}' DEPLOY_BRANCH='${DEPLOY_BRANCH}' HOST_PORT='${HOST_PORT}' MODE='${MODE}' bash -s" \
  < "${SCRIPT_DIR}/server-deploy.sh"

echo "==> Done. App should be reachable on http://${SSH_HOST}:${HOST_PORT}"
