'use client';
import { useState } from 'react';
export default function Coach(){
  const [minutes, setMinutes] = useState(20);
  const [goal, setGoal] = useState('fat-loss');
  const [plan, setPlan] = useState<any>(null);
  async function makePlan(){
    const r = await fetch((process.env.NEXT_PUBLIC_API_ORIGIN||'http://localhost:4000').replace(':4000', ':5000') + '/v1/coach/plan', {
      method:'POST', headers:{'content-type':'application/json'},
      body: JSON.stringify({ minutes, goal, level: 'beginner', seed: 42 })
    });
    setPlan(await r.json());
  }
  return (<main className="max-w-4xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-4">Coach</h1>
    <div className="flex gap-2 items-center">
      <label>Minutes <input type="number" value={minutes} onChange={e=>setMinutes(parseInt(e.target.value||'0'))} className="border rounded px-2 py-1 w-24 ml-1"/></label>
      <label>Goal <select value={goal} onChange={e=>setGoal(e.target.value)} className="border rounded px-2 py-1 ml-1">
        <option value="fat-loss">Fat loss</option><option value="strength">Strength</option><option value="skill">Skill</option><option value="endurance">Endurance</option>
      </select></label>
      <button onClick={makePlan} className="border rounded px-3 py-2">Generate</button>
    </div>
    {plan && <pre className="mt-4 bg-gray-100 p-3 rounded">{JSON.stringify(plan,null,2)}</pre>}
  </main>);
}
