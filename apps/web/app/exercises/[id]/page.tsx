'use client';
import useSWR from 'swr';
export default function ExerciseDetail({ params }: { params: { id: string } }) {
  const { data } = useSWR(`/api/exercises/${params.id}`, (u)=>fetch(u).then(r=>r.json()));
  if (!data) return null;
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{data.name}</h1>
      <p className="text-slate-600 mt-2">Primary: {data.primaryMuscles.join(', ')} | Skill: {data.skill}</p>
      <ol className="mt-4 list-decimal pl-6">{data.instructions.map((s: string, i: number) => <li key={i}>{s}</li>)}</ol>
    </main>
  );
}
