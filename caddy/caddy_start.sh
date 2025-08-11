#!/bin/sh

set -euo pipefail

# for backwards compatibility, seperates host and port from url
export APP_DOMAIN=${APP_DOMAIN:-${FRONTEND_HOST%:*}}
export APP_PORT=${APP_PORT:-${FRONTEND_HOST##*:}}

# strip https:// or https:// from domain if necessary
APP_DOMAIN=${APP_DOMAIN##*://}

echo using app: ${APP_DOMAIN} with port: ${APP_PORT} frontend host: ${FRONTEND_HOST}

exec ls -a

exec caddy run --config Caddyfile --adapter caddyfile 2>&1
