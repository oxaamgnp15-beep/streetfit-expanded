import { FastifyInstance } from 'fastify';
import v1 from './v1/index.js';
export default async function routes(app: FastifyInstance) { await app.register(v1, { prefix: '/v1' }); }
