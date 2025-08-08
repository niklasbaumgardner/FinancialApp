#!/bin/sh

set -euo pipefail

export PORT=${PORT}

echo using port: ${PORT}


gunicorn run:app -k gevent --workers 17 -b [::]:${PORT:-3000} --log-level debug
