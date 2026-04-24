import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default async function exportData(app: FastifyInstance) {
  app.post('/export', { preHandler: [app.auth] }, async (req: any) => {
    const [user, plans, workouts] = await Promise.all([
      prisma.user.findUnique({ where: { id: req.user.sub } }),
      prisma.plan.findMany({ where: { userId: req.user.sub }, include: { items: true } }),
      prisma.workout.findMany({ where: { userId: req.user.sub }, include: { entries: true } }),
    ]);
    return { user, plans, workouts };
  });
}
