import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { registerBody, loginBody } from '@streetfit/lib';
import { hashPassword, verifyPassword } from '@streetfit/lib';
import crypto from 'node:crypto';
const prisma = new PrismaClient();
export default async function auth(app: FastifyInstance) {
  app.post('/register', async (req, rep) => {
    const body = registerBody.parse(req.body);
    const exists = await prisma.user.findUnique({ where: { email: body.email } });
    if (exists) return rep.status(409).send({ error: 'Email in use' });
    const user = await prisma.user.create({ data: { email: body.email, passwordHash: await hashPassword(body.password), locale: body.locale } });
    const token = app.jwt.sign({ sub: user.id, role: user.role }, { expiresIn: '15m' });
    const refresh = await prisma.refreshToken.create({ data: { userId: user.id, token: crypto.randomUUID(), expiresAt: new Date(Date.now() + 1000*60*60*24*7) } });
    return rep.send({ token, refresh: refresh.token });
  });
  app.post('/login', async (req, rep) => {
    const body = loginBody.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user) return rep.status(401).send({ error: 'Invalid credentials' });
    if (!(await verifyPassword(body.password, user.passwordHash))) return rep.status(401).send({ error: 'Invalid credentials' });
    if (user.isBanned || user.deletedAt) return rep.status(403).send({ error: 'Account disabled' });
    const token = app.jwt.sign({ sub: user.id, role: user.role }, { expiresIn: '15m' });
    const refresh = await prisma.refreshToken.create({ data: { userId: user.id, token: crypto.randomUUID(), expiresAt: new Date(Date.now() + 1000*60*60*24*7) } });
    return rep.send({ token, refresh: refresh.token });
  });
  app.post('/logout', { preHandler: [app.auth] }, async (req: any, rep) => {
    const { refresh } = req.body as { refresh?: string };
    if (refresh) await prisma.refreshToken.deleteMany({ where: { token: refresh } });
    return rep.send({ ok: true });
  });
}
