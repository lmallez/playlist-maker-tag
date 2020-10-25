FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn run build

FROM nginx:1-alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /usr/src/app/dist/playlist-maker-tag /usr/share/nginx/html
EXPOSE 8080 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
