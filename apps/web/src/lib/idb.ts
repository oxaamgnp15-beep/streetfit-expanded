export function idb<T = any>(dbName='streetfit', store='queue'){
  let dbp: Promise<IDBDatabase> | null = null;
  function open(){
    return dbp ??= new Promise((res, rej)=>{
      const req = indexedDB.open(dbName, 1);
      req.onupgradeneeded = ()=> req.result.createObjectStore(store, { keyPath: 'id', autoIncrement: true });
      req.onsuccess = ()=> res(req.result);
      req.onerror = ()=> rej(req.error);
    });
  }
  return {
    async add(value:T){ const db = await open(); return new Promise((res, rej)=>{ const tx = db.transaction(store, 'readwrite'); tx.objectStore(store).add(value); tx.oncomplete=()=>res(true as any); tx.onerror=()=>rej(tx.error); }); },
    async all(){ const db = await open(); return new Promise<T[]>((res, rej)=>{ const tx = db.transaction(store,'readonly'); const req = tx.objectStore(store).getAll(); req.onsuccess=()=>res(req.result as any); req.onerror=()=>rej(req.error); }); },
    async clear(){ const db = await open(); return new Promise((res, rej)=>{ const tx = db.transaction(store,'readwrite'); tx.objectStore(store).clear(); tx.oncomplete=()=>res(true as any); tx.onerror=()=>rej(tx.error); }); }
  };
}
