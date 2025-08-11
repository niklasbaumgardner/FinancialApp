FROM python:3.12-slim as flask_build

# upgrade pip
RUN pip install --upgrade pip

WORKDIR /app

COPY flask_start.sh requirements.txt .

RUN chmod a+x flask_start.sh
# RUN chmod a+x Caddyfile
RUN pip install -r requirements.txt

COPY . .

EXPOSE 3000

ENTRYPOINT ["/bin/sh"]

CMD ["flask_start.sh"]
