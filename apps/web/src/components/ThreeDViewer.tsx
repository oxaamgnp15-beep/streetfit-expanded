'use client';
import { useEffect, useRef } from 'react';
import { ThreeEngine } from '@streetfit/three-engine';
export default function ThreeDViewer() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const engine = new ThreeEngine();
    engine.mount(ref.current);
    const onResize = () => engine.resize();
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize); engine.dispose(); };
  }, []);
  return <div ref={ref} className="w-full h-full" role="img" aria-label="3D street training scene" />;
}
