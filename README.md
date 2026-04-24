# StreetFit — Production Monorepo (Expanded)

Next.js 14 web app, Fastify API, FastAPI coach; Postgres + Redis + MinIO.
Includes admin CRUD, plans/logs/export, offline background sync, planner undo/redo, a11y/perf scaffolding.

## Quick start
```bash
cp .env.example .env
pnpm install
pnpm -C apps/api db:generate
pnpm -C apps/api db:migrate
pnpm -C apps/api db:seed
pnpm compose
# web  → http://localhost:3000
# api  → http://localhost:4000/docs
# coach→ http://localhost:5000
```
