import { FastifyInstance } from 'fastify';
import auth from './auth.js';
import me from './me.js';
import exercises from './exercises.js';
import stats from './stats.js';
import plans from './plans.js';
import logs from './logs.js';
import exportData from './export.js';
import admin from './admin.js';
export default async function v1(app: FastifyInstance) {
  await app.register(auth, { prefix: '/auth' });
  await app.register(me);
  await app.register(exercises, { prefix: '/exercises' });
  await app.register(stats, { prefix: '/stats' });
  await app.register(plans);
  await app.register(logs);
  await app.register(exportData);
  await app.register(admin, { prefix: '/admin' });
}
