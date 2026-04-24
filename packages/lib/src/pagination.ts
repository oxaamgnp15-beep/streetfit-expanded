export function encodeCursor(v: unknown) { return Buffer.from(JSON.stringify(v), 'utf8').toString('base64url'); }
export function decodeCursor<T = unknown>(c?: string|null): T|undefined { if(!c) return; return JSON.parse(Buffer.from(c, 'base64url').toString('utf8')) as T; }
