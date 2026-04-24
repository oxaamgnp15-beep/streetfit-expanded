import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default async function stats(app: FastifyInstance) {
  app.get('/stats/weekly', { preHandler: [app.auth] }, async (req: any) => {
    const since = new Date(Date.now() - 1000*60*60*24*7);
    const sessions = await prisma.workout.findMany({ where: { userId: req.user.sub, startedAt: { gte: since } }, include: { entries: true } });
    const totalSec = sessions.flatMap(s => s.entries).reduce((a, e) => a + (e.durationSec ?? 0), 0);
    return { weekSeconds: totalSec };
  });
}
