FROM node:20 AS builder

WORKDIR /usr/app

COPY package.json ./
COPY .npmrc ./

RUN yarn
RUN cp -R node_modules prod_node_modules
COPY . .
RUN yarn build

FROM builder as production

WORKDIR /usr/app
COPY --from=builder /usr/app/prod_node_modules ./node_modules
COPY --from=builder /usr/app/package*.json ./

ENV PORT=5000
ENV NODE_ENV=production
COPY --from=builder /usr/app/.svelte-kit ./.svelte-kit

EXPOSE 5000

CMD [ "yarn", "start" ]