import * as React from 'react';
export function Dialog({open, onClose, children}:{open:boolean; onClose:()=>void; children:React.ReactNode}){
  if(!open) return null;
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 bg-black/40 grid place-items-center">
      <div className="bg-white rounded-lg p-4 max-w-lg w/full">
        <button className="absolute right-3 top-3" onClick={onClose} aria-label="Close">✕</button>
        {children}
      </div>
    </div>
  );
}
