import { FastifyInstance } from 'fastify';
import Redis from 'ioredis';
export async function redis(app: FastifyInstance) {
  const client = new Redis(process.env.REDIS_URL!);
  app.decorate('redis', client as any);
  app.addHook('onClose', async () => (client as any).quit());
}
declare module 'fastify' { interface FastifyInstance { redis: any; } }
