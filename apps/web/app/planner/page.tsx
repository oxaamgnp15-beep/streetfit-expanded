'use client';
import { useReducer } from 'react';
import { IntervalTimer } from '@streetfit/ui';

type Item = { id:string; name:string; durationSec:number; restSec:number };
type State = { items: Item[]; past: Item[][]; future: Item[][] };
type Action = { type:'add', item:Item } | { type:'remove', id:string } | { type:'undo' } | { type:'redo' };

function reducer(state: State, action: Action): State {
  if (action.type === 'add') return { past:[...state.past, state.items], items:[...state.items, action.item], future:[] };
  if (action.type === 'remove') return { past:[...state.past, state.items], items: state.items.filter(i=>i.id!==action.id), future:[] };
  if (action.type === 'undo' && state.past.length) { const prev = state.past[state.past.length-1]; return { items: prev, past: state.past.slice(0,-1), future:[state.items, ...state.future] }; }
  if (action.type === 'redo' && state.future.length) { const next = state.future[0]; return { items: next, past:[...state.past, state.items], future: state.future.slice(1) }; }
  return state;
}

export default function Planner(){
  const [state, dispatch] = useReducer(reducer, { items: [], past: [], future: [] });
  const add = () => dispatch({ type:'add', item: { id: crypto.randomUUID(), name:'Interval', durationSec:20, restSec:10 } });
  return (<main className="max-w-4xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-4">Planner</h1>
    <div className="flex gap-2 mb-3">
      <button className="border rounded px-3 py-1" onClick={add}>Add Interval</button>
      <button className="border rounded px-3 py-1" onClick={()=>dispatch({type:'undo'})}>Undo</button>
      <button className="border rounded px-3 py-1" onClick={()=>dispatch({type:'redo'})}>Redo</button>
    </div>
    <ul className="divide-y">{state.items.map(i=> <li key={i.id} className="py-2 flex items-center justify-between"><span>{i.name} — {i.durationSec}/{i.restSec}s</span><button className="text-red-600" onClick={()=>dispatch({type:'remove', id:i.id})}>Remove</button></li>)}</ul>
    <div className="mt-6"><IntervalTimer durationSec={20} /></div>
  </main>);
}
