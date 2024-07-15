FROM node:18.14.0-alpine

WORKDIR /code

RUN apk update && apk upgrade && apk add --no-cache \
  bash \
  git \
  make \
  py3-pip

RUN pip install --upgrade pip && pip install awscli

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci
