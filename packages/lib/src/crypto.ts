import crypto from 'node:crypto';
export const hashPassword = async (pw: string) => (await import('bcryptjs')).hash(pw, 12);
export const verifyPassword = async (pw: string, hash: string) => (await import('bcryptjs')).compare(pw, hash);
export const signHmac = (key: string, data: string) => crypto.createHmac('sha256', key).update(data).digest('hex');
