import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';
export async function docs(app: FastifyInstance) {
  await app.register(swagger, { openapi: { info: { title: 'StreetFit API', version: '0.1.0' } } });
  await app.register(swaggerUi, { routePrefix: '/docs' });
}
