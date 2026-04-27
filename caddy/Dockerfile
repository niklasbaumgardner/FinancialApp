FROM caddy:builder AS builder

RUN xcaddy build \
    --with github.com/mholt/caddy-ratelimit \
    --with github.com/WeidiDeng/caddy-cloudflare-ip \
    --with github.com/caddy-dns/cloudflare

FROM caddy:latest

COPY --from=builder /usr/bin/caddy /usr/bin/caddy

WORKDIR /app

COPY /caddy/Caddyfile .
COPY /finapp/static/dist  ./static/dist
COPY /finapp/static/images  ./static/images
COPY /finapp/static/manifest.webmanifest  ./static/manifest.webmanifest

RUN caddy fmt --overwrite Caddyfile

CMD ["caddy", "run", "--config", "Caddyfile"]