import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { paginationQuery } from '@streetfit/lib';
import { decodeCursor, encodeCursor } from '@streetfit/lib';
const prisma = new PrismaClient();
export default async function exercises(app: FastifyInstance) {
  app.get('/', async (req, _rep) => {
    const { cursor, limit, q } = paginationQuery.parse(req.query);
    const cursorObj = decodeCursor<{ id: string }>(cursor);
    const where:any = q ? { OR: [ { name: { contains: q, mode: 'insensitive' } }, { tags: { has: q.toLowerCase() } } ] } : {};
    const rows = await prisma.exercise.findMany({ where, take: limit + 1, skip: cursorObj ? 1 : 0, cursor: cursorObj ? { id: cursorObj.id } : undefined, orderBy: { name: 'asc' } });
    let next: string | null = null;
    if (rows.length > limit) { const last = rows.pop()!; next = encodeCursor({ id: last.id }); }
    return { items: rows, nextCursor: next };
  });
  app.get('/:id', async (req, rep) => {
    const id = (req.params as any).id;
    const ex = await prisma.exercise.findUnique({ where: { id } });
    if (!ex) return rep.status(404).send({ error: 'Not found' });
    return ex;
  });
}
