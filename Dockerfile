FROM --platform=linux/amd64 node:20.5.1-bookworm-slim AS builder

WORKDIR /usr/app

COPY package.json yarn.lock ./
COPY .npmrc ./

RUN yarn
RUN cp -R node_modules prod_node_modules
COPY . .
RUN yarn build

FROM builder as production

WORKDIR /usr/app
COPY --from=builder /usr/app/prod_node_modules ./node_modules
COPY --from=builder /usr/app/package*.json ./
COPY --from=builder /usr/app/.svelte-kit ./.svelte-kit

EXPOSE 5000

CMD [ "yarn", "start" ]
