FROM node:16
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
COPY tsconfig.json ./
RUN touch empty.ts
ENV NODE_ENV production
RUN yarn
COPY . .
RUN yarn build
EXPOSE 5001
ENTRYPOINT [ "node",  "dist/src/index.js" ]
# TODO switch to two step build