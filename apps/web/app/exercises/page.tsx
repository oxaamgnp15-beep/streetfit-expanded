'use client';
import useSWR from 'swr';
import { useState } from 'react';
import { ExerciseCard } from '../../src/components/ExerciseCard';
const fetcher = (u: string) => fetch(u).then(r => r.json());
export default function Exercises() {
  const [q, setQ] = useState('');
  const { data } = useSWR(`/api/exercises?q=${encodeURIComponent(q)}`, fetcher);
  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Exercises</h1>
      <input aria-label="Search exercises" value={q} onChange={e=>setQ(e.target.value)} className="border rounded px-3 py-2 w-full" placeholder="Search or filter by tag..." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {data?.items?.map((e: any) => <ExerciseCard key={e.id} ex={e} />)}
      </div>
    </main>
  );
}
