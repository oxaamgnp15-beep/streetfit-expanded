import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default async function logs(app: FastifyInstance) {
  app.get('/logs', { preHandler: [app.auth] }, async (req: any) => {
    const since = new Date(Date.now() - 1000*60*60*24*30);
    const sessions = await prisma.workout.findMany({ where: { userId: req.user.sub, startedAt: { gte: since } }, include: { entries: true } });
    return { items: sessions };
  });
  app.post('/logs', { preHandler: [app.auth] }, async (req: any, rep) => {
    const { entries = [], startedAt = new Date().toISOString(), endedAt = null } = (req.body||{});
    const w = await prisma.workout.create({ data: { userId: req.user.sub, startedAt: new Date(startedAt), endedAt: endedAt ? new Date(endedAt) : null,
      entries: { create: entries.map((e:any)=>({ exerciseId: e.exerciseId, reps: e.reps ?? null, durationSec: e.durationSec ?? null, notes: e.notes ?? null })) } },
      include: { entries: true } });
    return rep.status(201).send(w);
  });
}
