'use client';
import { useEffect, useRef, useState } from 'react';
export function IntervalTimer({ durationSec = 20, onEnd }: { durationSec?: number; onEnd?: ()=>void }) {
  const workerRef = useRef<Worker>();
  const [rem, setRem] = useState(durationSec*1000);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    workerRef.current = new Worker(new URL('../../workers/timer.worker.ts', import.meta.url));
    workerRef.current.onmessage = (e: MessageEvent) => {
      setRem(e.data.remainingMs);
      if (e.data.remainingMs === 0) { setRunning(false); onEnd?.(); announce('Timer completed'); beep(); }
    };
    return () => workerRef.current?.terminate();
  }, [onEnd]);
  const start = () => { setRunning(true); workerRef.current?.postMessage({ cmd:'start', durationMs: durationSec*1000 }); announce('Timer started'); };
  const stop = () => { setRunning(false); workerRef.current?.postMessage({ cmd:'stop' }); announce('Timer stopped'); };
  return (
    <div role="group" aria-label="Interval timer" className="flex items-center gap-3">
      <button onClick={running?stop:start} className="border rounded px-3 py-2" aria-pressed={running}>{running?'Pause':'Start'}</button>
      <output aria-live="polite" aria-atomic="true" className="tabular-nums">{Math.ceil(rem/1000)}s</output>
      <span className="sr-only" id="timer-status" />
    </div>
  );
}
function announce(msg: string) { const el = document.getElementById('live-region'); if (el) el.textContent = msg; }
function beep() { try { const ac = new (window.AudioContext || (window as any).webkitAudioContext)(); const o = ac.createOscillator(); o.frequency.value = 880; o.connect(ac.destination); o.start(); setTimeout(()=>{o.stop(); ac.close();}, 120); navigator.vibrate?.(100); } catch {} }
