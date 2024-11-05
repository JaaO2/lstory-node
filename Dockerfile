# syntax=docker/dockerfile:1
ARG NODE_VERSION=20.17.0
FROM node:${NODE_VERSION}-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install ${ENVIROMENT}

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev || npm install --omit=dev

USER node
COPY . .
EXPOSE ${PORT}
CMD npm start
