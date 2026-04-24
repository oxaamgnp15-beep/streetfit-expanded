import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { planSchema } from '@streetfit/lib';
const prisma = new PrismaClient();
export default async function plans(app: FastifyInstance) {
  app.get('/plans', { preHandler: [app.auth] }, async (req: any) => {
    const rows = await prisma.plan.findMany({ where: { userId: req.user.sub }, include: { items: true } });
    return { items: rows };
  });
  app.post('/plans', { preHandler: [app.auth] }, async (req: any, rep) => {
    const body = planSchema.parse(req.body);
    const items = body.items.map(i => ({ ...i, exerciseId: i.exerciseId }));
    const p = await prisma.plan.create({ data: { userId: req.user.sub, name: body.name, items: { create: items } }, include: { items: true } });
    return rep.status(201).send(p);
  });
}
