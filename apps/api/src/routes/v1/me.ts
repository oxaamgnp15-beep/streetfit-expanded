import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default async function me(app: FastifyInstance) {
  app.get('/me', { preHandler: [app.auth] }, async (req: any) => {
    const user = await prisma.user.findUnique({ where: { id: req.user.sub }, select: { id: true, email: true, role: true, locale: true } });
    return { user };
  });
}
