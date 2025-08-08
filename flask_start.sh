#!/bin/bash

set -euo pipefail

export PORT=${PORT}

echo using port: ${PORT}

exec gunicorn run:app -k gevent --workers 17 -b [::]:${3000:-3000} --log-level debug
