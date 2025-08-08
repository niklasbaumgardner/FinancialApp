#!/bin/bash

echo using port: ${PORT}

exec gunicorn run:app -k gevent --workers 17 -b [::]:${PORT:-3000} --log-level debug
