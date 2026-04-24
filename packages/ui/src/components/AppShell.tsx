import * as React from 'react';
export function AppShell({header, children}:{header?:React.ReactNode; children:React.ReactNode}){
  return (<div>
    <header className="sticky top-0 bg-white/90 backdrop-blur border-b">{header}</header>
    <main>{children}</main>
  </div>);
}
