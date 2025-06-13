# Base image
FROM python:3.11-slim

# Install nginx
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Set working dir
WORKDIR /app

# Copy Flask app and install dependencies
COPY app /app
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy nginx config
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy startup script
COPY --from=nginx:alpine /usr/sbin/nginx /usr/sbin/nginx

# Expose port
EXPOSE 80

# Start Gunicorn and Nginx
CMD ["sh", "-c", "gunicorn run:app -k gevent --workers 17 --log-level debug"]