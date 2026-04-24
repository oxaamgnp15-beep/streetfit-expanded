import Link from 'next/link';
export function ExerciseCard({ ex }: { ex: any }) {
  return (
    <Link href={`/exercises/${ex.id}`} className="block rounded-lg border p-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <h3 className="font-semibold">{ex.name}</h3>
      <p className="text-sm text-slate-600">{ex.tags.join(' • ')}</p>
    </Link>
  );
}
