
export function markActiveNav(){const page=document.body?.dataset?.page; if(!page) return; document.querySelector(`[data-nav="${page}"]`)?.classList.add('active');}
export async function loadJson(path){const res=await fetch(path); if(!res.ok) throw new Error(`Unable to load ${path}`); return res.json();}
document.addEventListener('DOMContentLoaded',markActiveNav);
