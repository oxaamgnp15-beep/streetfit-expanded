let end = 0, interval = 1000, id: any;
self.onmessage = (e: MessageEvent) => {
  const { cmd, durationMs } = e.data;
  if (cmd === 'start') { end = Date.now() + durationMs; tick(); }
  if (cmd === 'stop') { clearTimeout(id); }
};
function tick() {
  const rem = Math.max(0, end - Date.now());
  (self as any).postMessage({ remainingMs: rem });
  if (rem > 0) id = setTimeout(tick, interval);
}
