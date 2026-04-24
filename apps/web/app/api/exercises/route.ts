import { NextRequest } from 'next/server';
export async function GET(req: NextRequest) {
  const base = process.env.NEXT_PUBLIC_API_ORIGIN || 'http://localhost:4000';
  const url = new URL(base + '/v1/exercises');
  const q = req.nextUrl.searchParams.get('q');
  if (q) url.searchParams.set('q', q);
  const r = await fetch(url, { headers: { 'content-type': 'application/json' }, cache: 'no-store' });
  return new Response(await r.text(), { status: r.status, headers: { 'content-type': 'application/json' } });
}
