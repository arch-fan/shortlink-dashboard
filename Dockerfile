FROM node:lts AS base

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

FROM base AS pnpm
RUN npm i -g pnpm

FROM pnpm AS prod-deps

RUN pnpm install -P

FROM pnpm AS build-deps

RUN pnpm install

FROM build-deps AS build

COPY . .
RUN pnpm run build

FROM base AS runtime

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY ./public ./public

ENV HOST=0.0.0.0
ENV PORT=4321

EXPOSE 4321
CMD ["npm", "start"]