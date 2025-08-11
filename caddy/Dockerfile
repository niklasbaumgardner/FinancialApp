FROM caddy:latest

WORKDIR /caddy

COPY ./caddy_start.sh ./Caddyfile .

RUN chmod a+x caddy_start.sh

RUN caddy fmt --overwrite Caddyfile

ENTRYPOINT ["/bin/sh"]

CMD ["caddy_start.sh"]