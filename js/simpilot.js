
(function(){
  if(window.__ASE_SIMPILOT_LOADED__) return;
  window.__ASE_SIMPILOT_LOADED__ = true;

  const prefix = document.body?.dataset?.dataPrefix || './';
  const shield = prefix + 'assets/brand/ase-shield-icon.png';
  const fallbackData = {
    fallback:{label:'Agentic AI Security Context',focus:'Use Simpilot to reason from the current page, selected component, or visible risk.',controls:['Input and Context Validation','Tool Governance','Agent Identity and Access Control','Runtime Monitoring and Containment'],impact:['Operational disruption','Data exposure','Compliance or audit exposure']},
    contexts:{},risks:{},incidents:['A prompt or retrieved document manipulates the agent.','The agent trusts the manipulated context and selects a risky action.','A tool, memory, or identity boundary is crossed.','Business impact appears as data exposure, disruption, financial loss, or audit concern.']
  };
  let data = fallbackData;
  let state = { type:'page', key: document.body?.dataset?.page || 'home', label: pageLabel(), risk:null };


  function injectSimpilotStyles(){
    if(document.getElementById('ase-simpilot-runtime-styles')) return;
    const css = `
/* ASE Simpilot runtime styles for pages that do not load main.css, especially ASE3 */
.simpilot-shell,.simpilot-shell *{box-sizing:border-box}
.simpilot-shell{position:fixed !important;right:22px !important;bottom:22px !important;z-index:2147483000 !important;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif !important;color:#f4f7fb !important;isolation:isolate;contain:layout style;line-height:1.35;text-align:left;transform:none !important;filter:none !important;mix-blend-mode:normal !important;pointer-events:auto !important}
.simpilot-shell img{max-width:none !important;height:auto !important}.simpilot-card{width:min(384px,calc(100vw - 28px));max-height:78vh;border:1px solid rgba(232,163,61,.42);background:linear-gradient(145deg,rgba(18,20,24,.97),rgba(11,16,24,.96));border-radius:20px;box-shadow:0 18px 55px rgba(0,0,0,.52),0 0 34px rgba(232,163,61,.14);overflow:hidden;backdrop-filter:blur(10px);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#f4f7fb;position:relative !important;transform:none !important}
.simpilot-card p,.simpilot-card li{font-size:13px;line-height:1.45}.simpilot-collapsed{width:250px;cursor:pointer;padding:13px 15px;display:flex;align-items:center;gap:12px;transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease;background:linear-gradient(135deg,#f8c75a 0%,#e8a33d 52%,#b86f18 100%) !important;color:#16120a;border-color:rgba(255,224,166,.95);box-shadow:0 18px 46px rgba(0,0,0,.42),0 0 34px rgba(232,163,61,.36)}
.simpilot-collapsed:hover{transform:translateY(-2px);box-shadow:0 22px 58px rgba(0,0,0,.55),0 0 42px rgba(232,163,61,.42);border-color:rgba(255,224,166,.95)}.simpilot-expanded{display:none}.simpilot-shell.open .simpilot-collapsed{display:none}.simpilot-shell.open .simpilot-expanded{display:block}
.simpilot-shield-wrap{position:relative;width:40px;height:40px;flex:0 0 40px;display:grid;place-items:center;border-radius:14px;background:rgba(18,14,8,.14);border:1px solid rgba(18,14,8,.22);box-shadow:0 0 14px rgba(255,255,255,.18)}.simpilot-shield-wrap:before{content:"";position:absolute;inset:-5px;border-radius:17px;border:1px solid rgba(232,163,61,.24);animation:simpilot-orbit 9s linear infinite}.simpilot-shield{width:24px;height:24px;object-fit:contain;filter:drop-shadow(0 0 8px rgba(232,163,61,.35));animation:simpilot-breathe 4.8s ease-in-out infinite}
.simpilot-title{font-weight:800;letter-spacing:.02em;line-height:1.1;color:#120e08}.simpilot-subtitle{font-size:12px;color:rgba(18,14,8,.78);margin-top:2px}.simpilot-status{display:flex;align-items:center;gap:6px;font-size:11px;color:rgba(18,14,8,.86);margin-top:6px}.simpilot-dot{width:7px;height:7px;border-radius:99px;background:#14100a;box-shadow:0 0 10px rgba(255,255,255,.42);animation:simpilot-dot 3.8s ease-in-out infinite}
.simpilot-head{padding:15px;border-bottom:1px solid rgba(255,224,166,.32);display:flex;align-items:center;gap:12px;background:linear-gradient(135deg,#f8c75a 0%,#e8a33d 54%,#8a5418 100%) !important;color:#16120a}.simpilot-head .simpilot-title{color:#120e08}.simpilot-head .simpilot-subtitle{color:rgba(18,14,8,.78)}.simpilot-close{margin-left:auto;border:1px solid rgba(18,14,8,.25);background:rgba(18,14,8,.13);color:#16120a;border-radius:10px;padding:5px 9px;cursor:pointer;font-weight:800}.simpilot-close:hover{filter:brightness(1.06)}
.simpilot-body{padding:14px;overflow:auto;max-height:calc(78vh - 86px);background:linear-gradient(145deg,rgba(18,20,24,.97),rgba(11,16,24,.96))}.simpilot-section-label{font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:#e8a33d;margin-bottom:7px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}.simpilot-context{display:none !important}
.simpilot-topline{position:relative;border:1px solid rgba(232,163,61,.30);background:linear-gradient(145deg,rgba(232,163,61,.11),rgba(79,193,232,.045));border-radius:14px;padding:11px 34px 11px 12px;margin-bottom:13px}.simpilot-topline.hidden{display:none}.simpilot-hide-insight{position:absolute;right:8px;top:8px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.04);color:#cbd5e1;border-radius:8px;width:22px;height:22px;line-height:18px;cursor:pointer}.simpilot-hide-insight:hover{border-color:rgba(232,163,61,.45);color:#fff}.simpilot-context-pill{display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(232,163,61,.34);background:rgba(232,163,61,.12);border-radius:999px;padding:5px 8px;font-size:11px;font-weight:800;color:#ffdca0;margin-bottom:8px;max-width:100%}.simpilot-context-pill span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.simpilot-insight-title{font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:#e8a33d;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;margin-bottom:4px}.simpilot-insight{font-size:13px;color:#cbd5e1;line-height:1.45}
.simpilot-chips{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:13px}.simpilot-chip{border:1px solid rgba(232,163,61,.28);background:linear-gradient(145deg,rgba(232,163,61,.12),rgba(79,193,232,.05));color:#f4f7fb;border-radius:12px;padding:10px 9px;cursor:pointer;font-weight:700;font-size:12px;text-align:left;transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease}.simpilot-chip:hover{transform:translateY(-1px);border-color:rgba(232,163,61,.62);box-shadow:0 0 20px rgba(232,163,61,.13)}.simpilot-ask{display:grid;gap:8px;margin-bottom:13px}.simpilot-input{width:100%;box-sizing:border-box;border:1px solid rgba(255,255,255,.12);background:#0e151e;color:#f4f7fb;border-radius:12px;padding:11px 12px}.simpilot-run{border:1px solid rgba(232,163,61,.45);background:linear-gradient(135deg,rgba(232,163,61,.24),rgba(0,163,255,.10));color:#f4f7fb;border-radius:12px;padding:10px 12px;font-weight:800;cursor:pointer}.simpilot-run:hover{border-color:rgba(232,163,61,.75)}
.simpilot-output{border:1px solid rgba(255,255,255,.10);background:rgba(0,0,0,.18);border-radius:14px;padding:12px;min-height:110px}.simpilot-output h4{margin:0 0 7px;color:#ffe0a6}.simpilot-output h5{margin:12px 0 5px;color:#f4f7fb;font-size:13px}.simpilot-output p{margin:0 0 8px;color:#cbd5e1}.simpilot-output ul{margin:4px 0 8px 18px;padding:0;color:#cbd5e1}.simpilot-output li{margin:3px 0}.simpilot-note{font-size:11px;color:#94a3b8;margin-top:10px;border-top:1px solid rgba(255,255,255,.08);padding-top:9px}
@keyframes simpilot-breathe{0%,100%{filter:drop-shadow(0 0 6px rgba(232,163,61,.24));transform:scale(1)}50%{filter:drop-shadow(0 0 15px rgba(232,163,61,.55));transform:scale(1.04)}}@keyframes simpilot-dot{0%,100%{opacity:.55;transform:scale(.9)}50%{opacity:1;transform:scale(1.12)}}@keyframes simpilot-orbit{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.simpilot-shell.simpilot-left-mode{left:22px !important;right:auto !important}.simpilot-shell:not(.simpilot-left-mode){right:22px !important;left:auto !important}.simpilot-shell{transition:left .25s ease,right .25s ease,bottom .25s ease}
@media(max-width:700px){.simpilot-shell{right:12px !important;left:12px !important;bottom:12px !important}.simpilot-collapsed{width:auto}.simpilot-card{width:100%;max-height:72vh;border-radius:18px}.simpilot-chips{grid-template-columns:1fr}.simpilot-body{max-height:calc(72vh - 86px)}}`;
    const style = document.createElement('style');
    style.id = 'ase-simpilot-runtime-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function loadData(){
    return fetch(prefix + 'data/copilot-playbooks.json').then(r=>r.ok?r.json():fallbackData).catch(()=>fallbackData).then(d=>{ data=d; });
  }
  function pageLabel(){
    const h = document.querySelector('main h2, .hero h2, h1');
    return clean(h?.textContent || document.title || 'ASE');
  }
  function clean(t){ return (t || '').replace(/\s+/g,' ').trim(); }
  function keyFor(text){
    const t = clean(text).toLowerCase();
    if(/tool|mcp|api|function/.test(t)) return 'tool';
    if(/memory|retrieval|rag|context store/.test(t)) return 'memory';
    if(/prompt|context|input|injection/.test(t)) return 'prompt';
    if(/identity|access|permission|privilege|credential|secret/.test(t)) return 'identity';
    if(/runtime|monitor|sandbox|egress|policy|execution/.test(t)) return 'runtime';
    if(/explorer/.test(t)) return 'explorer';
    return document.body?.dataset?.page || 'home';
  }
  function getCtx(){
    if(state.risk){ return {label: state.risk, meta:'Current Risk', key:keyFor(state.risk)}; }
    const ctx = data.contexts?.[state.key] || data.contexts?.[document.body?.dataset?.page] || data.fallback;
    return {label: state.label || ctx.label, meta: state.type === 'component' ? 'Current Component' : 'Current Context', key:state.key};
  }
  function setContext(label,type='component'){
    const text = clean(label);
    if(!text || text.length < 2) return;
    state = {type, key:keyFor(text), label:text, risk: type === 'risk' ? text : null};
    updateContextUI();
  }
  function insightText(){
    const label = (state.risk || state.label || '').toLowerCase();
    const ctx = data.contexts?.[state.key] || data.fallback;
    if(label.includes('prompt') || label.includes('injection')) return 'Prompt and context inputs often become the first place an attack tries to influence agent behavior.';
    if(label.includes('tool') || label.includes('mcp') || label.includes('api')) return 'Tool calls convert agent decisions into real-world actions, so governance and approval gates matter.';
    if(label.includes('memory')) return 'Memory improves continuity, but can preserve sensitive data, poisoned context, or stale assumptions.';
    if(label.includes('identity') || label.includes('credential') || label.includes('access')) return 'Agent actions need accountable identity, scoped permissions, and auditable authorization boundaries.';
    if(label.includes('runtime')) return 'Runtime controls are the last opportunity to observe, interrupt, or contain unsafe agent behavior.';
    if(ctx && ctx.focus) return ctx.focus;
    return 'Use Simpilot quick guidance to connect what you are viewing to risks, controls, incident chains, and business impact.';
  }

  function inferFromClick(e){
    if(e.target.closest('.simpilot-shell')) return;
    const risk = e.target.closest('.risk-chip, .risk-chip-head');
    if(risk){
      const name = clean(risk.querySelector?.('.rname')?.textContent || risk.textContent).split('\n')[0];
      if(name) setContext(name,'risk');
      return;
    }
    const node = e.target.closest('[data-component], [data-id], .node, .component, .component-card, .wheel-card, .card, button');
    if(!node) return;
    let txt = clean(node.getAttribute('data-component') || node.getAttribute('data-id') || node.querySelector?.('h3,h4,.label,.name')?.textContent || node.textContent);
    if(txt && txt.length <= 80 && /(tool|memory|prompt|identity|runtime|agent|orchestrator|planner|trust|risk|chain|impact)/i.test(txt)) setContext(txt,'component');
  }
  function makeShell(){
    const shell = document.createElement('aside');
    shell.className = 'simpilot-shell';
    shell.setAttribute('aria-label','Simpilot Security Guide');
    shell.innerHTML = `
      <div class="simpilot-card simpilot-collapsed" role="button" tabindex="0" aria-label="Open Simpilot Security Guide">
        <div class="simpilot-shield-wrap"><img class="simpilot-shield" src="${shield}" alt="ASE shield"></div>
        <div><div class="simpilot-title">Simpilot</div><div class="simpilot-subtitle">Security Guide</div><div class="simpilot-status"><span class="simpilot-dot"></span><span data-simpilot-status>Guidance Ready</span></div></div>
      </div>
      <div class="simpilot-card simpilot-expanded">
        <div class="simpilot-head"><div class="simpilot-shield-wrap"><img class="simpilot-shield" src="${shield}" alt="ASE shield"></div><div><div class="simpilot-title">Simpilot</div><div class="simpilot-subtitle">Security Guide</div></div><button class="simpilot-close" type="button" aria-label="Collapse Simpilot">Close</button></div>
        <div class="simpilot-body">
          <div class="simpilot-topline" data-simpilot-topline><button type="button" class="simpilot-hide-insight" data-simpilot-hide-insight aria-label="Hide key insight">×</button><div class="simpilot-context-pill">Context: <span data-simpilot-context>${getCtx().label}</span></div><div class="simpilot-insight-title">Key Insight</div><div class="simpilot-insight" data-simpilot-insight>${insightText()}</div><div class="simpilot-context-meta" data-simpilot-meta style="display:none">${getCtx().meta}</div></div>
          <div class="simpilot-section-label">Quick Guidance</div>
          <div class="simpilot-chips"><button class="simpilot-chip" data-intent="explain">Explain Risk</button><button class="simpilot-chip" data-intent="controls">Recommend Controls</button><button class="simpilot-chip" data-intent="impact">Business Impact</button><button class="simpilot-chip" data-intent="chain">Incident Chain</button></div>
          <div class="simpilot-section-label">Ask Simpilot</div>
          <div class="simpilot-ask"><input class="simpilot-input" data-simpilot-input placeholder="Ask about tools, memory, identity, runtime, or impact"><button class="simpilot-run" data-simpilot-run>Generate Guidance</button></div>
          <div class="simpilot-output" data-simpilot-output><h4>Welcome to Simpilot</h4><p>Select a quick guidance option, or click an Explorer component or risk to make Simpilot context-aware.</p><div class="simpilot-note">Runs locally in the browser. No API calls and no data leaves the page.</div></div>
        </div>
      </div>`;
    document.body.appendChild(shell);
    shell.querySelector('.simpilot-collapsed').addEventListener('click',()=>shell.classList.add('open'));
    shell.querySelector('.simpilot-collapsed').addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); shell.classList.add('open'); }});
    shell.querySelector('.simpilot-close').addEventListener('click',()=>shell.classList.remove('open'));
    shell.querySelectorAll('.simpilot-chip').forEach(b=>b.addEventListener('click',()=>render(b.dataset.intent)));
    shell.querySelector('[data-simpilot-run]').addEventListener('click',()=>render('freeform'));
    const hideBtn = shell.querySelector('[data-simpilot-hide-insight]');
    if(hideBtn) hideBtn.addEventListener('click',()=>shell.querySelector('[data-simpilot-topline]')?.classList.add('hidden'));
    shell.querySelector('[data-simpilot-input]').addEventListener('keydown',e=>{ if(e.key==='Enter') render('freeform'); });
    return shell;
  }
  let shell;
  function updateContextUI(){
    if(!shell) return;
    const c = getCtx();
    shell.querySelector('[data-simpilot-context]').textContent = c.label;
    shell.querySelector('[data-simpilot-meta]').textContent = c.meta;
    shell.querySelector('[data-simpilot-status]').textContent = c.label && c.label !== 'ASE' ? 'Guidance Available' : 'Guidance Ready';
    const insight = shell.querySelector('[data-simpilot-insight]');
    if(insight) insight.textContent = insightText();
  }
  function findRisk(query){
    const q = (query || '').toLowerCase();
    const risks = data.risks || {};
    return Object.keys(risks).find(k => q.includes(k)) || Object.keys(risks).find(k => (state.risk||'').toLowerCase().includes(k));
  }
  function model(query){
    const riskKey = findRisk(query);
    if(riskKey) return data.risks[riskKey];
    const ctx = data.contexts?.[keyFor(query || state.label)] || data.contexts?.[state.key] || data.fallback;
    return {label: state.risk || state.label || ctx.label, what: ctx.focus, controls: ctx.controls, impact: ctx.impact};
  }
  function render(intent){
    const input = shell.querySelector('[data-simpilot-input]');
    const q = clean(input.value);
    if(q) state.key = keyFor(q);
    const m = model(q);
    const chain = data.incidents || fallbackData.incidents;
    let html = `<h4>${escapeHtml(m.label || getCtx().label)}</h4>`;
    if(intent === 'controls'){
      html += block('Recommended Controls', m.controls || data.fallback.controls);
      html += `<h5>Architect Focus</h5><p>Constrain what the agent can see, decide, and do. Add validation before action and monitoring during execution.</p>`;
    } else if(intent === 'impact'){
      html += block('Business Impact', m.impact || data.fallback.impact);
      html += `<h5>Leadership Priority</h5><p>Connect this risk to governance, auditability, runtime oversight, and measurable control outcomes.</p>`;
    } else if(intent === 'chain'){
      html += block('Likely Incident Chain', chain);
      html += `<h5>Next Step</h5><p>Use the Explorer to inspect related risks and see how separate weaknesses combine into business impact.</p>`;
    } else {
      html += `<h5>What It Is</h5><p>${escapeHtml(m.what || data.fallback.focus)}</p>`;
      html += block('Why It Matters', m.impact || data.fallback.impact);
      html += block('Primary Defenses', m.controls || data.fallback.controls);
    }
    html += `<div class="simpilot-note">Simpilot M1 uses local ASE guidance files and deterministic routing. No backend or LLM call is used.</div>`;
    shell.querySelector('[data-simpilot-output]').innerHTML = html;
    shell.classList.add('open');
    updateContextUI();
  }
  function block(title, items){ return `<h5>${title}</h5><ul>${(items||[]).map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul>`; }
  function escapeHtml(s){ return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }


  function isAse3Page(){
    const page = (document.body?.dataset?.page || '').toLowerCase();
    const path = (location.pathname || '').toLowerCase();
    return page === 'explorer' || page === 'ase3' || path.endsWith('/ase3.html') || path.includes('ase3.html');
  }

  function visibleBox(el){
    if(!el || el.closest?.('.simpilot-shell')) return false;
    const style = window.getComputedStyle(el);
    if(style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false;
    const r = el.getBoundingClientRect();
    return r.width > 180 && r.height > 140 && r.right > window.innerWidth * 0.58 && r.top < window.innerHeight * 0.92 && r.bottom > 80;
  }

  function ase3DetailsOpen(){
    const selectors = [
      '#detailsPanel','#detailPanel','#nodeDetails','#node-details','#details-pane','#detail-pane',
      '.details-panel','.detail-panel','.node-details','.node-detail','.details-pane','.detail-pane',
      '.inspector-panel','.inspector','.side-panel','.right-panel','.drawer','.info-panel',
      '[class*="detail"]','[id*="detail"]','[class*="inspector"]','[id*="inspector"]'
    ];
    for(const sel of selectors){
      const nodes = document.querySelectorAll(sel);
      for(const node of nodes){
        const text = (node.textContent || '').replace(/\s+/g,' ').trim();
        if(visibleBox(node) && text.length > 40) return true;
      }
    }
    return false;
  }

  function updateAse3Dock(){
    if(!shell || !isAse3Page()) return;
    shell.classList.toggle('simpilot-left-mode', ase3DetailsOpen());
  }

  function startAse3DockObserver(){
    if(!isAse3Page()) return;
    updateAse3Dock();
    const observer = new MutationObserver(()=>updateAse3Dock());
    observer.observe(document.body,{attributes:true,childList:true,subtree:true,attributeFilter:['class','style','hidden','aria-hidden']});
    window.addEventListener('resize', updateAse3Dock);
    window.addEventListener('scroll', updateAse3Dock, true);
    setInterval(updateAse3Dock, 900);
  }

  loadData().then(()=>{ injectSimpilotStyles(); shell = makeShell(); updateContextUI(); startAse3DockObserver(); document.addEventListener('click', inferFromClick, true); });
})();
