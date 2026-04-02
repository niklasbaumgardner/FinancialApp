import os


port = os.environ.get("PORT", "3000")
bind = f"[::]:{port}"
# bind = "127.0.0.1:5000"


workers = 5
threads = 4

timeout = 30
keepalive = 2
max_requests = 1000
max_requests_jitter = 100
