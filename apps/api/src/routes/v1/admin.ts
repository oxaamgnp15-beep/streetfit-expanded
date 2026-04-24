import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
const prisma = new PrismaClient();
const exSchema = z.object({
  name: z.string().min(1), slug: z.string().min(1),
  primaryMuscles: z.array(z.string()), secondaryMuscles: z.array(z.string()).default([]),
  equipment: z.array(z.string()).default(['bodyweight']), skill: z.string().default('beginner'),
  met: z.number().default(3.5), instructions: z.array(z.string()).default([]),
  regressions: z.array(z.string()).default([]), progressions: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([])
});
export default async function admin(app: FastifyInstance) {
  const requireAdmin = async (req:any, rep:any) => { await req.jwtVerify(); if (req.user.role !== 'admin') return rep.code(403).send({ error: 'forbidden' }); };
  app.post('/exercises', { preHandler: [requireAdmin] }, async (req:any, rep) => {
    const body = exSchema.parse(req.body);
    const created = await prisma.exercise.create({ data: body });
    rep.code(201).send(created);
  });
  app.put('/exercises/:id', { preHandler: [requireAdmin] }, async (req:any, rep) => {
    const id = req.params.id as string;
    const body = exSchema.partial().parse(req.body);
    const updated = await prisma.exercise.update({ where: { id }, data: body });
    rep.send(updated);
  });
  app.delete('/exercises/:id', { preHandler: [requireAdmin] }, async (req:any, rep) => {
    const id = req.params.id as string;
    await prisma.exercise.delete({ where: { id } });
    rep.code(204).send();
  });
}
