import { vi } from 'vitest';
vi.mock('@prisma/client', () => {
  const mPrisma = {
    exercise: { findMany: vi.fn().mockResolvedValue([]) },
  };
  return { PrismaClient: class { constructor() { return mPrisma; } } };
});
