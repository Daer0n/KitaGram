# poetry export --without-hashes --format=requirements.txt > requirements.txt
FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE 1

RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip install psycopg2

COPY requirements.txt .
RUN pip install -r requirements.txt

WORKDIR /usr/src/app
    
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

COPY ./app /usr/src/app

ENTRYPOINT ["/bin/sh", "entrypoint.sh"]
