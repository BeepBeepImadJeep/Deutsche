FROM node:alpine as builder
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run zip


FROM nginx:latest
ENV COMPOSER_MEMORY_LIMIT=-1
WORKDIR /var/www/html
COPY --from=builder /usr/src/app .
