FROM node:15.11.0-alpine3.13 AS builder
RUN apk add git

WORKDIR /build
ADD . .
RUN yarn install --verbose --frozen-lockfile --link-duplicates && yarn build

RUN ls -lsa web/

