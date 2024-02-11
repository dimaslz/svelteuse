FROM node:18-alpine as builder

WORKDIR /app

# update packages
RUN apk update
RUN apk add -q --update --no-cache \
	chromium \
	nss \
	freetype \
	freetype-dev \
	harfbuzz \
	ca-certificates \
	ttf-freefont \
	nodejs \
	yarn

COPY . .

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN yarn install

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN NODE_ENV=production yarn build

EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "start"]