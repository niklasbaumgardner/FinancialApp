FROM caddy:latest

WORKDIR /app

COPY Caddyfile .

COPY --chmod=755 caddy_start.sh .

RUN caddy fmt --overwrite Caddyfile

ENTRYPOINT ["/bin/sh"]

CMD ["caddy_start.sh"]