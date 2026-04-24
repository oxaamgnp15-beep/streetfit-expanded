'use client';
import * as React from 'react';
export function ErrorOverlay({message, retry}:{message:string; retry:()=>void}){
  return (<div role="status" className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-3 rounded-md shadow">
    <p className="font-semibold">Issue detected</p>
    <p className="text-sm">{message}</p>
    <button className="mt-2 underline" onClick={retry}>Retry</button>
  </div>);
}
