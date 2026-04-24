import { NextRequest } from 'next/server';
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const base = process.env.NEXT_PUBLIC_API_ORIGIN || 'http://localhost:4000';
  const r = await fetch(base + '/v1/exercises/' + encodeURIComponent(params.id), { headers: { 'content-type': 'application/json' }, cache: 'no-store' });
  return new Response(await r.text(), { status: r.status, headers: { 'content-type': 'application/json' } });
}
