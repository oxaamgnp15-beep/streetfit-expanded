FROM node:20-alpine AS deps
RUN corepack enable && corepack prepare pnpm@9.6.0 --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml .npmrc ./
COPY packages ./packages
COPY apps/api/package.json ./apps/api/package.json
RUN pnpm -r --filter @streetfit/api... install --frozen-lockfile

FROM deps AS build
WORKDIR /app/apps/api
COPY apps/api .
RUN pnpm build

FROM node:20-alpine AS run
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/apps/api/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
EXPOSE 4000
CMD ["node","dist/index.js"]
