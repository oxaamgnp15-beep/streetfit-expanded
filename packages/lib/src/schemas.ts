import { z } from 'zod';
export const paginationQuery = z.object({
  cursor: z.string().nullish(),
  limit: z.coerce.number().min(1).max(100).default(20),
  q: z.string().max(64).optional()
});
export const registerBody = z.object({ email: z.string().email(), password: z.string().min(8), locale: z.string().default('en') });
export const loginBody = z.object({ email: z.string().email(), password: z.string().min(8), totp: z.string().length(6).optional() });
export const planSchema = z.object({
  name: z.string().min(1).max(80),
  items: z.array(z.object({
    exerciseId: z.string().uuid(),
    type: z.enum(['interval','reps','emom','amrap']),
    sets: z.number().int().min(1).max(20).default(1),
    reps: z.number().int().min(0).max(200).default(0),
    durationSec: z.number().int().min(0).max(3600).default(0),
    restSec: z.number().int().min(0).max(600).default(60)
  }))
});
