FROM node:20-buster AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY lerna.json ./
COPY packages/client/package.json ./packages/client/package.json
COPY packages/server/package.json ./packages/server/package.json

RUN yarn lerna bootstrap

COPY . .

RUN yarn build

FROM node:20-buster-slim AS production
WORKDIR /app

ENV NODE_ENV=production

COPY package.json ./

COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/packages/client/node_modules/ ./packages/client/node_modules/
COPY --from=builder /app/packages/server/node_modules/ ./packages/server/node_modules/

COPY --from=builder /app/packages/server/dist/ ./packages/server/dist/
COPY --from=builder /app/packages/client/dist/ ./packages/client/dist/

COPY --from=builder /app/packages/server/package.json ./packages/server/package.json


EXPOSE ${SERVER_PORT}

CMD [ "node", "packages/server/dist/index.js" ]