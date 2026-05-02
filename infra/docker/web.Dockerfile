FROM node:20-alpine AS deps
RUN corepack enable && corepack prepare pnpm@9.6.0 --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml .npmrc ./
COPY packages ./packages
COPY apps/web/package.json ./apps/web/package.json
RUN pnpm -r --filter @streetfit/web... install --frozen-lockfile

FROM deps AS build
WORKDIR /app/apps/web
COPY apps/web .
RUN pnpm build

FROM node:20-alpine AS run
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/apps/web/.next/standalone .
COPY --from=build /app/apps/web/.next/static ./.next/static
COPY --from=build /app/apps/web/public ./public
EXPOSE 3000
CMD ["node","server.js"]
