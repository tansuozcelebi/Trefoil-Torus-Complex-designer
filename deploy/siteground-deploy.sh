#!/usr/bin/env bash
#
# siteground-deploy.sh — Build the site and upload it to SiteGround over SSH.
#
# SiteGround shared hosting does not run Docker, so instead of the container
# flow we build the static site locally and rsync the dist/ output into the
# site's public_html. The .htaccess in public/ handles SPA routing on Apache.
#
# Config is read from deploy/siteground.env (see siteground.env.example).
#
# Usage:
#   ./deploy/siteground-deploy.sh            # build + deploy
#   ./deploy/siteground-deploy.sh --no-build # deploy existing dist/ only
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
ENV_FILE="${SITEGROUND_ENV:-${SCRIPT_DIR}/siteground.env}"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "ERROR: $ENV_FILE not found." >&2
  echo "Copy deploy/siteground.env.example to deploy/siteground.env and fill it in." >&2
  exit 1
fi

# shellcheck disable=SC1090
set -a; source "$ENV_FILE"; set +a

: "${SG_HOST:?SG_HOST is required in siteground.env}"
: "${SG_USER:?SG_USER is required in siteground.env}"
: "${SG_REMOTE_DIR:?SG_REMOTE_DIR is required in siteground.env}"
SG_PORT="${SG_PORT:-18765}"

SSH_BASE=(ssh -p "$SG_PORT" -o StrictHostKeyChecking=accept-new)
if [[ -n "${SG_KEY:-}" ]]; then
  SG_KEY="${SG_KEY/#\~/$HOME}"
  SSH_BASE+=(-i "$SG_KEY")
fi

# --- Build ------------------------------------------------------------------
if [[ "${1:-}" != "--no-build" ]]; then
  echo "==> Building site (npm ci && npm run build)..."
  cd "$PROJECT_DIR"
  npm ci
  npm run build
fi

if [[ ! -d "$PROJECT_DIR/dist" ]]; then
  echo "ERROR: dist/ not found. Run a build first (omit --no-build)." >&2
  exit 1
fi

# --- Upload -----------------------------------------------------------------
echo "==> Deploying dist/ to ${SG_USER}@${SG_HOST}:${SG_REMOTE_DIR} (port ${SG_PORT})"

# rsync over the same SSH options. --delete keeps the remote in sync with the
# build (removes stale files); trailing slash on dist/ uploads its contents.
rsync -avz --delete \
  --exclude '.well-known' \
  -e "${SSH_BASE[*]}" \
  "$PROJECT_DIR/dist/" \
  "${SG_USER}@${SG_HOST}:${SG_REMOTE_DIR}/"

echo "==> Done. Site updated at https://${SG_HOST}/"
