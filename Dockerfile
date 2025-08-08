FROM python:3.12-slim
FROM caddy:latest

# upgrade pip
RUN pip install --upgrade pip

WORKDIR /app

COPY Caddyfile requirements.txt flask_start.sh ./

RUN chmod a+x flask_start.sh
RUN chmod a+x Caddyfile
RUN pip install -r requirements.txt

RUN caddy fmt --overwrite Caddyfile

COPY . ./

# define the port number the container should expose
EXPOSE 3000

ENTRYPOINT ["/bin/sh"]

CMD ["flask_start.sh"]
