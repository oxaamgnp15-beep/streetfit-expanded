import Link from 'next/link';
export function HeaderNav(){
  return (<nav className="max-w-6xl mx-auto px-4 py-3 flex gap-4 items-center">
    <Link className="font-bold" href="/">StreetFit</Link>
    <div className="flex gap-3 text-sm">
      <Link href="/exercises">Exercises</Link>
      <Link href="/planner">Planner</Link>
      <Link href="/progress">Progress</Link>
      <Link href="/coach">Coach</Link>
      <Link href="/settings">Settings</Link>
      <Link href="/admin">Admin</Link>
    </div>
  </nav>);
}
