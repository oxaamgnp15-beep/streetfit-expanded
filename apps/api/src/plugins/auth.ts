import fjwt from '@fastify/jwt';
import { FastifyInstance } from 'fastify';
export async function auth(app: FastifyInstance) {
  await app.register(fjwt, { secret: process.env.JWT_SECRET! });
  app.decorate('auth', async (req: any) => { await req.jwtVerify(); });
}
declare module 'fastify' { interface FastifyInstance { auth: any } }
