import Fastify from 'fastify';
import routes from '../apps/api/src/routes/index';
import { auth } from '../apps/api/src/plugins/auth';
import { security } from '../apps/api/src/plugins/security';
it('lists exercises', async () => {
  const app = Fastify(); await app.register(security); await app.register(auth); await app.register(routes, { prefix: '/' });
  const res = await app.inject({ method: 'GET', url: '/v1/exercises' });
  expect(res.statusCode).toBe(200);
});
