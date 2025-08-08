FROM python:slim

# upgrade pip
RUN pip install --upgrade pip

WORKDIR /app

COPY requirements.txt /app

RUN pip install -r requirements.txt

COPY . /app

# define the port number the container should expose
EXPOSE 5000

ENTRYPOINT ["./boot.sh"]
