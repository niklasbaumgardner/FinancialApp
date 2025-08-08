FROM python:3.12-slim

# upgrade pip
RUN pip install --upgrade pip

WORKDIR /app

COPY requirements.txt flask_start.sh ./

RUN chmod a+x flask_start.sh
RUN pip install -r requirements.txt

COPY . ./

# define the port number the container should expose
EXPOSE 3000

ENTRYPOINT ["./flask_start.sh"]
