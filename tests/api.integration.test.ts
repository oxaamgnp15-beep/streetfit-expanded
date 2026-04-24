import { vi } from "vitest";
import { test, expect } from "vitest";
import Fastify from 'fastify';
import routes from '../apps/api/src/routes/index';
import { auth } from '../apps/api/src/plugins/auth';
import fp from 'fastify-plugin';
const fakeAuthPlugin = fp(async (app) => {
  app.decorate('auth', async function (req: any, rep: any) { });
});
import { security } from '../apps/api/src/plugins/security';
test('lists exercises', async () => {
  const app = Fastify(); await app.register(security); process.env.JWT_SECRET = "supersecret"; process.env.DATABASE_URL="postgres://user:pass@localhost:5432/db";
  await app.register(fakeAuthPlugin); await app.register(auth); await app.register(routes, { prefix: '/' });
  const res = await app.inject({ method: 'GET', url: '/v1/exercises' });

  expect(res.statusCode).toBe(200);
});
