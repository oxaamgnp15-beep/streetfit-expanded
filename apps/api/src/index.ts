import Fastify from 'fastify';
import { security } from './plugins/security.js';
import { auth } from './plugins/auth.js';
import { redis } from './plugins/redis.js';
import { docs } from './plugins/swagger.js';
import routes from './routes/index.js';

const app = Fastify({ logger: true });
await app.register(security);
await app.register(auth);
await app.register(redis);
await app.register(docs);
await app.register(routes);

const PORT = Number(process.env.PORT ?? 4000);
app.listen({ port: PORT, host: '0.0.0.0' }).catch((e) => { app.log.error(e); process.exit(1); });
