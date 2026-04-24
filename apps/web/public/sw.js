// App shell caching + background sync queue for logs
const CACHE = 'streetfit-v2';
const APP_SHELL = ['/', '/exercises', '/site.webmanifest'];
const DB = 'streetfit'; const STORE = 'queue';
function idb(){
  return new Promise((res, rej)=>{ const req = indexedDB.open(DB, 1); req.onupgradeneeded=()=>req.result.createObjectStore(STORE, { keyPath:'id', autoIncrement:true }); req.onsuccess=()=>res(req.result); req.onerror=()=>rej(req.error); });
}
async function queueRequest(data){
  const db = await idb(); return await new Promise((res, rej)=>{ const tx = db.transaction(STORE,'readwrite'); tx.objectStore(STORE).add(data); tx.oncomplete=()=>res(true); tx.onerror=()=>rej(tx.error); });
}
async function flushQueue(){
  const db = await idb();
  const all = await new Promise((res, rej)=>{ const tx = db.transaction(STORE,'readonly'); const req = tx.objectStore(STORE).getAll(); req.onsuccess=()=>res(req.result); req.onerror=()=>rej(req.error); });
  for (const item of all) {
    try { await fetch(item.url, { method:item.method, headers:item.headers, body:item.body }); } catch (error) { console.error('Background sync failed:', error); }
  }
  await new Promise((res, rej)=>{ const tx = db.transaction(STORE,'readwrite'); tx.objectStore(STORE).clear(); tx.oncomplete=()=>res(true); tx.onerror=()=>rej(tx.error); });
}

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(APP_SHELL)));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        const fetchPromise = fetch(e.request).then(resp => {
          const copy = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
          return resp;
        }).catch(()=>cached);
        return cached || fetchPromise;
      })
    );
  } else if (url.pathname.endsWith('/v1/logs') && e.request.method === 'POST') {
    e.respondWith((async () => {
      try {
        const resp = await fetch(e.request.clone());
        return resp;
      } catch {
        const body = await e.request.clone().text();
        const headers = {}; e.request.headers.forEach((v,k)=>headers[k]=v);
        await queueRequest({ url: e.request.url, method: 'POST', headers, body });
        if ('sync' in self.registration) { try { await self.registration.sync.register('sync-logs'); } catch {} }
        return new Response(JSON.stringify({ queued: true }), { status: 202, headers: { 'content-type':'application/json' } });
      }
    })());
  }
});
self.addEventListener('sync', e => { if (e.tag === 'sync-logs') e.waitUntil(flushQueue()); });
