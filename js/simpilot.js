
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
  function inferFromClick(e){
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
          <div class="simpilot-section-label">Current Context</div>
          <div class="simpilot-context"><div class="simpilot-context-main" data-simpilot-context>${getCtx().label}</div><div class="simpilot-context-meta" data-simpilot-meta>${getCtx().meta}</div></div>
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
    shell.querySelector('[data-simpilot-input]').addEventListener('keydown',e=>{ if(e.key==='Enter') render('freeform'); });
    return shell;
  }
  let shell;
  function updateContextUI(){
    if(!shell) return;
    const c = getCtx();
    shell.querySelector('[data-simpilot-context]').textContent = c.label;
    shell.querySelector('[data-simpilot-meta]').textContent = c.meta;
    shell.querySelector('[data-simpilot-status]').textContent = c.label && c.label !== 'ASE' ? 'Context Available' : 'Guidance Ready';
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

  loadData().then(()=>{ shell = makeShell(); updateContextUI(); document.addEventListener('click', inferFromClick, true); });
})();
