'use client';
import { useState } from 'react';
export default function Admin(){
  const [form, setForm] = useState({ name:'', slug:'', met:3.5 });
  const [token, setToken] = useState('');
  async function createExercise(){
    const r = await fetch((process.env.NEXT_PUBLIC_API_ORIGIN||'http://localhost:4000') + '/v1/admin/exercises', {
      method:'POST', headers:{ 'content-type':'application/json', 'authorization': `Bearer ${token}` },
      body: JSON.stringify({ ...form, primaryMuscles:['chest'], secondaryMuscles:['triceps'], equipment:['bodyweight'], skill:'beginner', instructions:[], regressions:[], progressions:[], tags:['bodyweight'] })
    });
    alert(r.ok ? 'Created' : 'Failed: ' + (await r.text()));
  }
  return (<main className="max-w-3xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-4">Admin Console</h1>
    <label className="block mb-2">JWT <input value={token} onChange={e=>setToken(e.target.value)} className="border rounded px-2 py-1 w-full"/></label>
    <label className="block mb-2">Name <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="border rounded px-2 py-1 w-full"/></label>
    <label className="block mb-2">Slug <input value={form.slug} onChange={e=>setForm({...form, slug:e.target.value})} className="border rounded px-2 py-1 w-full"/></label>
    <label className="block mb-2">MET <input type="number" step="0.1" value={form.met} onChange={e=>setForm({...form, met: parseFloat(e.target.value||'0')})} className="border rounded px-2 py-1 w-32"/></label>
    <button onClick={createExercise} className="border rounded px-3 py-2">Create</button>
  </main>);
}
