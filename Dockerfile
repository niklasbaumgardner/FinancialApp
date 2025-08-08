FROM python:3.12-slim as flask_build

# upgrade pip
RUN pip install --upgrade pip

WORKDIR /app

COPY requirements.txt .

# RUN chmod a+x start.sh
# RUN chmod a+x Caddyfile
RUN pip install -r requirements.txt

COPY . .

# define the port number the container should expose
# EXPOSE 3000

# ENTRYPOINT ["/bin/sh"]

# CMD ["flask_start.sh"]


FROM caddy:latest as caddy_build

# WORKDIR /app

# COPY Caddyfile requirements.txt start.sh .
COPY --from=flask_build . .

WORKDIR /app

RUN chmod a+x start.sh
RUN chmod a+x Caddyfile

# COPY --from=flask_build /app /app

# RUN caddy fmt --overwrite Caddyfile

EXPOSE 3000

ENTRYPOINT ["/bin/sh"]

CMD ["start.sh"]
