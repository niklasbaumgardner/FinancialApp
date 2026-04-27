import os

port = os.environ.get("PORT", "3000")
bind = f"[::]:{port}"


workers = 5
threads = 2
worker_class = "gthread"

timeout = 30
keepalive = 2
max_requests = 1000
max_requests_jitter = 100

# accesslog = "-"
# errorlog = "-"
# capture_output = True
# loglevel = "debug"
