
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
  let riskInteractionAt = 0;


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
.simpilot-topline{position:relative;border:1px solid rgba(232,163,61,.30);background:linear-gradient(145deg,rgba(232,163,61,.11),rgba(79,193,232,.045));border-radius:14px;padding:11px 34px 11px 12px;margin-bottom:13px}.simpilot-topline.hidden{display:none}.simpilot-topline.collapsed{padding:9px 34px 9px 12px}.simpilot-topline.collapsed .simpilot-insight-title,.simpilot-topline.collapsed .simpilot-insight{display:none}.simpilot-hide-insight{position:absolute;right:8px;top:8px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.04);color:#cbd5e1;border-radius:8px;width:22px;height:22px;line-height:18px;cursor:pointer;font-weight:800}.simpilot-hide-insight:hover{border-color:rgba(232,163,61,.45);color:#fff}.simpilot-context-pill{display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(232,163,61,.34);background:rgba(232,163,61,.12);border-radius:999px;padding:5px 8px;font-size:11px;font-weight:800;color:#ffdca0;margin-bottom:8px;max-width:100%}.simpilot-context-pill span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.simpilot-insight-title{font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:#e8a33d;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;margin-bottom:4px}.simpilot-insight{font-size:13px;color:#cbd5e1;line-height:1.45}
.simpilot-chips{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:13px}.simpilot-chip{border:1px solid rgba(232,163,61,.28);background:linear-gradient(145deg,rgba(232,163,61,.12),rgba(79,193,232,.05));color:#f4f7fb;border-radius:12px;padding:10px 9px;cursor:pointer;font-weight:700;font-size:12px;text-align:left;transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease}.simpilot-chip:hover{transform:translateY(-1px);border-color:rgba(232,163,61,.62);box-shadow:0 0 20px rgba(232,163,61,.13)}.simpilot-ask{display:grid;gap:8px;margin-bottom:13px}.simpilot-input{width:100%;box-sizing:border-box;border:1px solid rgba(255,255,255,.12);background:#0e151e;color:#f4f7fb;border-radius:12px;padding:11px 12px}.simpilot-run{border:1px solid rgba(232,163,61,.45);background:linear-gradient(135deg,rgba(232,163,61,.24),rgba(0,163,255,.10));color:#f4f7fb;border-radius:12px;padding:10px 12px;font-weight:800;cursor:pointer}.simpilot-run:hover{border-color:rgba(232,163,61,.75)}
.simpilot-output-wrap{display:grid;gap:8px}.simpilot-copy-row{display:flex;justify-content:flex-end}.simpilot-copy{border:1px solid rgba(232,163,61,.38);background:rgba(232,163,61,.10);color:#ffe0a6;border-radius:10px;padding:7px 10px;font-size:12px;font-weight:800;cursor:pointer}.simpilot-copy:hover{border-color:rgba(232,163,61,.70);background:rgba(232,163,61,.16)}.simpilot-output{border:1px solid rgba(255,255,255,.10);background:rgba(0,0,0,.18);border-radius:14px;padding:12px;min-height:110px}.simpilot-output h4{margin:0 0 7px;color:#ffe0a6}.simpilot-output h5{margin:12px 0 5px;color:#f4f7fb;font-size:13px}.simpilot-output p{margin:0 0 8px;color:#cbd5e1}.simpilot-output ul{margin:4px 0 8px 18px;padding:0;color:#cbd5e1}.simpilot-output li{margin:3px 0}.simpilot-note{font-size:11px;color:#94a3b8;margin-top:10px;border-top:1px solid rgba(255,255,255,.08);padding-top:9px}
@keyframes simpilot-breathe{0%,100%{filter:drop-shadow(0 0 6px rgba(232,163,61,.24));transform:scale(1)}50%{filter:drop-shadow(0 0 15px rgba(232,163,61,.55));transform:scale(1.04)}}@keyframes simpilot-dot{0%,100%{opacity:.55;transform:scale(.9)}50%{opacity:1;transform:scale(1.12)}}@keyframes simpilot-orbit{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.simpilot-shell.simpilot-left-mode{left:22px !important;right:auto !important}.simpilot-shell:not(.simpilot-left-mode){right:22px !important;left:auto !important}.simpilot-shell{transition:left .25s ease,right .25s ease,bottom .25s ease}

/* ASE v2.0 Phase 3.2 - Simpilot mobile optimization */
@media(max-width:700px){
  .simpilot-shell{right:12px !important;left:auto !important;bottom:12px !important;transition:left .25s ease,right .25s ease,bottom .25s ease !important}
  .simpilot-shell.simpilot-left-mode{left:12px !important;right:auto !important}
  .simpilot-shell:not(.simpilot-left-mode){right:12px !important;left:auto !important}
  .simpilot-card{width:min(238px,calc(100vw - 24px)) !important;max-height:58vh !important;border-radius:16px !important}
  .simpilot-collapsed{width:48px !important;height:48px !important;padding:0 !important;border-radius:999px !important;display:grid !important;place-items:center !important;gap:0 !important;box-shadow:0 12px 30px rgba(0,0,0,.44),0 0 24px rgba(232,163,61,.34) !important}
  .simpilot-collapsed>div:not(.simpilot-shield-wrap){display:none !important}
  .simpilot-collapsed .simpilot-shield-wrap{width:38px !important;height:38px !important;flex:0 0 38px !important;border-radius:999px !important;background:rgba(18,14,8,.10) !important}
  .simpilot-collapsed .simpilot-shield-wrap:before{inset:-4px !important;border-radius:999px !important}
  .simpilot-collapsed .simpilot-shield{width:23px !important;height:23px !important}
  .simpilot-expanded .simpilot-head{padding:9px 10px !important;gap:8px !important}
  .simpilot-expanded .simpilot-head .simpilot-shield-wrap{width:30px !important;height:30px !important;flex:0 0 30px !important;border-radius:11px !important}
  .simpilot-expanded .simpilot-head .simpilot-shield-wrap:before{display:none !important}
  .simpilot-expanded .simpilot-head .simpilot-shield{width:18px !important;height:18px !important}
  .simpilot-expanded .simpilot-title{font-size:13px !important}
  .simpilot-expanded .simpilot-subtitle{display:none !important}
  .simpilot-close{padding:4px 7px !important;font-size:11px !important;border-radius:8px !important}
  .simpilot-body{padding:9px !important;max-height:calc(58vh - 48px) !important}
  .simpilot-topline{padding:8px 30px 8px 9px !important;margin-bottom:9px !important;border-radius:12px !important}
  .simpilot-topline .simpilot-insight-title{display:none !important}
  .simpilot-topline:not(.collapsed) .simpilot-insight{font-size:11px !important;line-height:1.35 !important;display:-webkit-box !important;-webkit-line-clamp:2 !important;-webkit-box-orient:vertical !important;overflow:hidden !important}
  .simpilot-context-pill{font-size:10px !important;padding:4px 7px !important;margin-bottom:5px !important;max-width:170px !important}
  .simpilot-hide-insight{right:6px !important;top:6px !important;width:20px !important;height:20px !important;border-radius:7px !important;font-size:12px !important}
  .simpilot-section-label{font-size:10px !important;margin-bottom:5px !important}
  .simpilot-chips{grid-template-columns:1fr 1fr !important;gap:6px !important;margin-bottom:9px !important}
  .simpilot-chip{padding:7px 6px !important;font-size:11px !important;border-radius:10px !important;text-align:center !important}
  .simpilot-ask{display:none !important}
  .simpilot-copy-row{justify-content:flex-start !important}
  .simpilot-copy{padding:6px 8px !important;font-size:11px !important;border-radius:9px !important}
  .simpilot-output{min-height:60px !important;max-height:145px !important;overflow:auto !important;padding:9px !important;border-radius:12px !important}
  .simpilot-output h4{font-size:13px !important;margin-bottom:5px !important}
  .simpilot-output h5{font-size:11.5px !important;margin:8px 0 4px !important}
  .simpilot-output p,.simpilot-output li{font-size:11px !important;line-height:1.35 !important}
  .simpilot-output ul{margin-left:14px !important}
  .simpilot-note{font-size:10px !important;margin-top:7px !important;padding-top:6px !important}
}
@media(max-width:700px){.simpilot-shell{right:12px !important;left:12px !important;bottom:12px !important}.simpilot-collapsed{width:auto}.simpilot-card{width:100%;max-height:72vh;border-radius:18px}.simpilot-chips{grid-template-columns:1fr}.simpilot-body{max-height:calc(72vh - 86px)}}

/* ASE v2.0.1.1 - mobile open state: hide launcher/ring when panel is open */
@media(max-width:700px){
  .simpilot-shell.open .simpilot-collapsed{display:none !important;visibility:hidden !important;pointer-events:none !important}
  .simpilot-shell.open .simpilot-expanded{display:block !important}
  .simpilot-shell.open .simpilot-head .simpilot-shield-wrap{display:none !important}
}
/* ASE v2.0.1 - hide duplicate shield in expanded mobile Simpilot */
@media(max-width:700px){
  .simpilot-expanded .simpilot-head .simpilot-shield-wrap{display:none !important}
  .simpilot-expanded .simpilot-head{grid-template-columns:1fr auto !important}
}
`;
    const style = document.createElement('style');
    style.id = 'ase-simpilot-runtime-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function loadData(){
    const playbookReq = fetch(prefix + 'data/copilot-playbooks.json').then(r=>r.ok?r.json():fallbackData).catch(()=>fallbackData);
    const pathsReq = fetch(prefix + 'data/copilot-paths.json').then(r=>r.ok?r.json():{version:'2.1',paths:{}}).catch(()=>({version:'2.1',paths:{}}));
    return Promise.all([playbookReq, pathsReq]).then(([d, paths])=>{ data=d || fallbackData; data.paths = paths.paths || {}; });
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
    if(type === 'risk') riskInteractionAt = Date.now();
    else riskInteractionAt = 0;
    state = {type, key:keyFor(text), label:text, risk: type === 'risk' ? text : null};
    updateContextUI();
  }
  function activeRiskDetailText(){
    const chip = document.querySelector('.risk-chip.expanded');
    if(!chip) return '';
    const name = clean(chip.querySelector?.('.rname')?.textContent || '');
    if(state.risk && name && name !== state.risk) return '';
    const impact = clean(chip.querySelector?.('.field .field-value')?.textContent || '');
    const mitigation = clean(Array.from(chip.querySelectorAll?.('.field') || []).find(f => /mitigation/i.test(f.textContent || ''))?.querySelector?.('.field-value')?.textContent || '');
    return clean([impact, mitigation].filter(Boolean).join(' '));
  }

  function categoryInsight(label, detail=''){
    const text = (label + ' ' + detail).toLowerCase();
    if(/prompt|instruction|jailbreak|injection|override/.test(text)) return 'Prompt and instruction risks try to change agent behavior by manipulating user input, retrieved content, tool output, or hidden instructions.';
    if(/tool|mcp|api|function|action|execution/.test(text)) return 'Tool and action risks matter because agent decisions can become real API calls, workflow actions, code execution, or data access.';
    if(/sandbox|escape|isolation|container|boundary|segmentation|agent separation/.test(text)) return 'Isolation risks matter because weak boundaries can let one agent, tool, or execution context affect another, expanding blast radius.';
    if(/privilege|escalation|permission|credential|secret|token|access|auth|identity|impersonat/.test(text)) return 'Privilege and access risks can turn a local agent failure into unauthorized actions, weak accountability, or broader system compromise.';
    if(/memory|rag|retrieval|poison|embedding|vector|context|persistent|session/.test(text)) return 'Memory and retrieval risks can persist bad context, expose sensitive data, or influence later decisions long after the original interaction.';
    if(/exfiltrat|leak|disclosure|sensitive|privacy|confidential|data/.test(text)) return 'Data exposure risks are important because agents can combine prompts, memory, tools, and outputs into unintended disclosure paths.';
    if(/runtime|monitor|policy|guardrail|contain|egress|telemetry|audit|loop|resource|budget|cost/.test(text)) return 'Runtime security is the last opportunity to observe, interrupt, or contain unsafe agent behavior before business impact occurs.';
    if(/chain|cascade|incident|blast|lateral/.test(text)) return 'Incident-chain risks show how separate weaknesses can compound into disruption, data exposure, audit findings, or loss of control.';
    if(/planning|planner|orchestrat|workflow|delegation|handoff|coordination/.test(text)) return 'Planning and orchestration risks matter because one flawed decision can route the agent into unsafe tools, data, or downstream actions.';
    if(/output|response|content|hallucination|decision|integrity|validation/.test(text)) return 'Output integrity risks affect how users, systems, and downstream workflows trust agent responses, summaries, and decisions.';
    if(/supply|dependency|package|model|plugin|extension/.test(text)) return 'Supply chain risks can introduce compromised components into the agent path before runtime controls ever see the behavior.';
    if(/availability|denial|dos|crash|failure|disruption|service/.test(text)) return 'Availability risks matter because agent loops, resource abuse, or brittle dependencies can disrupt workflows even without data theft.';
    return '';
  }

  function insightText(){
    const labelRaw = state.risk || state.label || '';
    const ctx = data.contexts?.[state.key] || data.fallback;

    // Risk-specific playbook when available.
    const riskKey = findRisk(labelRaw);
    if(riskKey && data.risks?.[riskKey]?.what) return data.risks[riskKey].what;

    // Use both the risk name and expanded ASE3 detail text so generic risk titles still get useful insight.
    const detail = activeRiskDetailText();
    const routed = categoryInsight(labelRaw, detail);
    if(routed) return routed;

    // Last-mile contextual fallback: do not show the generic ASE message once a risk has been selected.
    if(state.risk){
      const impact = detail ? ` The expanded details indicate: ${detail.split('.').slice(0,1).join('.')}.` : '';
      return `${state.risk} can create a control gap in the selected agent component. Treat it as a risk that may expand blast radius, weaken governance, or increase business impact unless explicit prevention, detection, and containment controls are applied.${impact}`;
    }

    if(ctx && ctx.focus) return ctx.focus;
    return 'Use Simpilot quick guidance to connect what you are viewing to risks, controls, incident chains, and business impact.';
  }

  function inferFromClick(e){
    if(e.target.closest('.simpilot-shell')) return;
    const risk = e.target.closest('.risk-chip, .risk-chip-head');
    if(risk){
      const chip = risk.closest('.risk-chip') || risk;
      const name = clean(chip.querySelector?.('.rname')?.textContent || risk.querySelector?.('.rname')?.textContent || risk.textContent).split('\n')[0];
      if(name) setContext(name,'risk');
      return;
    }
    if(e.target.closest('#diagramSvg, .node-hit, svg')){
      riskInteractionAt = 0;
      setTimeout(()=>{
        const componentName = clean(document.querySelector('#dName')?.textContent || document.querySelector('.drawer-head h2')?.textContent || '');
        if(componentName) setContext(componentName,'component');
      }, 60);
    }
    const node = e.target.closest('[data-component], [data-id], .node, .component, .component-card, .wheel-card, .card, button');
    if(!node) return;
    let txt = clean(node.getAttribute('data-component') || node.getAttribute('data-id') || node.querySelector?.('h3,h4,.label,.name')?.textContent || node.textContent);
    if(txt && txt.length <= 80 && /(tool|memory|prompt|identity|runtime|agent|orchestrator|planner|trust|chain|impact|sandbox|guardrail|credential|secret|model|output|egress|lifecycle|telemetry|context|rag|retrieval)/i.test(txt)) setContext(txt,'component');
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
          <div class="simpilot-topline" data-simpilot-topline><button type="button" class="simpilot-hide-insight" data-simpilot-hide-insight aria-label="Collapse key insight" title="Collapse key insight">−</button><div class="simpilot-context-pill">Context: <span data-simpilot-context>${getCtx().label}</span></div><div class="simpilot-insight-title">Key Insight</div><div class="simpilot-insight" data-simpilot-insight>${insightText()}</div><div class="simpilot-context-meta" data-simpilot-meta style="display:none">${getCtx().meta}</div></div>
          <div class="simpilot-section-label">Quick Guidance</div>
          <div class="simpilot-chips"><button class="simpilot-chip" data-intent="explain">Explain Risk</button><button class="simpilot-chip" data-intent="controls">Recommend Controls</button><button class="simpilot-chip" data-intent="impact">Business Impact</button><button class="simpilot-chip" data-intent="chain">Incident Chain</button></div>
          <div class="simpilot-section-label">Ask Simpilot</div>
          <div class="simpilot-ask"><input class="simpilot-input" data-simpilot-input placeholder="Ask about tools, memory, identity, runtime, or impact"><button class="simpilot-run" data-simpilot-run>Generate Guidance</button></div>
          <div class="simpilot-output-wrap"><div class="simpilot-copy-row"><button class="simpilot-copy" type="button" data-simpilot-copy>Copy Guidance</button></div><div class="simpilot-output" data-simpilot-output><h4>Welcome to Simpilot</h4><p>Select a quick guidance option, or click an Explorer component or risk to make Simpilot context-aware.</p><div class="simpilot-note">Runs locally in the browser. No API calls and no data leaves the page.</div></div></div>
        </div>
      </div>`;
    document.body.appendChild(shell);
    shell.querySelector('.simpilot-collapsed').addEventListener('click',()=>shell.classList.add('open'));
    shell.querySelector('.simpilot-collapsed').addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); shell.classList.add('open'); }});
    shell.querySelector('.simpilot-close').addEventListener('click',()=>shell.classList.remove('open'));
    shell.querySelectorAll('.simpilot-chip').forEach(b=>b.addEventListener('click',()=>render(b.dataset.intent)));
    shell.querySelector('[data-simpilot-run]').addEventListener('click',()=>render('freeform'));
    shell.querySelector('[data-simpilot-copy]').addEventListener('click', async ()=>{
      const btn = shell.querySelector('[data-simpilot-copy]');
      const output = shell.querySelector('[data-simpilot-output]');
      const text = clean(output?.innerText || output?.textContent || '');
      if(!text) return;
      try { await navigator.clipboard.writeText(text); }
      catch(err){ const ta=document.createElement('textarea'); ta.value=text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); }
      btn.textContent='Copied'; setTimeout(()=>{btn.textContent='Copy Guidance';},1300);
    });
    const hideBtn = shell.querySelector('[data-simpilot-hide-insight]');
    if(hideBtn) hideBtn.addEventListener('click',()=>{
      const top = shell.querySelector('[data-simpilot-topline]');
      if(!top) return;
      const collapsed = top.classList.toggle('collapsed');
      hideBtn.textContent = collapsed ? '+' : '−';
      hideBtn.setAttribute('aria-label', collapsed ? 'Expand key insight' : 'Collapse key insight');
      hideBtn.setAttribute('title', collapsed ? 'Expand key insight' : 'Collapse key insight');
    });
    shell.querySelector('[data-simpilot-input]').addEventListener('keydown',e=>{ if(e.key==='Enter') render('freeform'); });
    return shell;
  }
  let shell;
  function updateContextUI(){
    if(!shell) return;
    const c = getCtx();
    shell.querySelector('[data-simpilot-context]').textContent = c.label;
    shell.querySelector('[data-simpilot-meta]').textContent = modeName();
    shell.querySelector('[data-simpilot-status]').textContent = c.label && c.label !== 'ASE' ? modeName() : 'Guidance Ready';
    const insight = shell.querySelector('[data-simpilot-insight]');
    if(insight) insight.textContent = insightText();
    updateModeLabels();
  }

  function activeRiskSnapshot(){
    const chip = document.querySelector('.risk-chip.expanded');
    let name = state.risk || '';
    if(chip){ name = clean(chip.querySelector?.('.rname')?.textContent || name); }
    const fields = {};
    if(chip){
      chip.querySelectorAll?.('.field').forEach(f=>{
        const k = clean(f.querySelector?.('.field-label')?.textContent || '');
        const v = clean(f.querySelector?.('.field-value')?.textContent || '');
        if(k && v) fields[k.toLowerCase()] = v;
      });
    }
    const controls = [];
    chip?.querySelectorAll?.('.defense-panel li').forEach(li=>{ const v=clean(li.textContent); if(v) controls.push(v); });
    const impacts = [];
    chip?.querySelectorAll?.('.business-impact-panel li').forEach(li=>{ const v=clean(li.textContent); if(v) impacts.push(v); });
    const chains = [];
    chip?.querySelectorAll?.('.chain-panel li').forEach(li=>{ const v=clean(li.textContent); if(v) chains.push(v); });
    return {name: name || state.label || getCtx().label, impact: fields.impact || '', mitigation: fields.mitigation || '', controls, impacts, chains, insight: insightText()};
  }
  function activeComponentName(){
    const active = document.querySelector('.node-hit.active');
    const label = clean(active?.getAttribute('aria-label') || active?.querySelector?.('text.node-label')?.textContent || '');
    return label || (state.type === 'component' ? state.label : '') || document.body?.dataset?.page || 'ASE';
  }
  function adaptiveMode(){
    if(state.risk) return 'analysis';
    if(state.type === 'component' && state.label && !/^home$|^guide$|^learning$|^architecture$|^about$/i.test(state.label)) return 'exploration';
    return 'learning';
  }
  function modeName(){
    const mode = adaptiveMode();
    if(mode === 'analysis') return 'Analysis Mode';
    if(mode === 'exploration') return 'Exploration Mode';
    return 'Learning Mode';
  }
  function suggestedPathKey(){
    const base = (state.risk || state.label || state.key || document.body?.dataset?.page || 'home').toLowerCase();
    if(/prompt|injection|context/.test(base)) return 'prompt';
    if(/tool|mcp|api|function/.test(base)) return 'tool';
    if(/memory|rag|retrieval/.test(base)) return 'memory';
    if(/identity|credential|secret|auth|permission|privilege/.test(base)) return 'identity';
    if(/sandbox|runtime|monitor|guardrail|telemetry|execution/.test(base)) return 'runtime';
    if(/incident|chain|attack path/.test(base)) return 'chain';
    if(/business|impact|executive/.test(base)) return 'business';
    if(/architecture|diagram|layer|component/.test(base)) return 'architecture';
    return keyFor(base);
  }
  function recommendedNext(){
    const key = suggestedPathKey();
    const path = data.paths?.[key] || data.paths?.default || [];
    return (path || []).slice(0,3);
  }
  function nextExplorationHtml(){
    const items = recommendedNext();
    if(!items.length) return '';
    return `<h5>Recommended Next Exploration</h5><ul>${items.map(x=>`<li>${escapeHtml(x.label || x)}</li>`).join('')}</ul>`;
  }
  function updateModeLabels(){
    if(!shell) return;
    const mode = adaptiveMode();
    const labels = mode === 'analysis'
      ? {explain:'Explain Risk', controls:'Recommend Controls', impact:'Business Impact', chain:'Incident Chain'}
      : mode === 'exploration'
        ? {explain:'What Is This?', controls:'Common Risks', impact:'Security Focus', chain:'Next Exploration'}
        : {explain:'Explain Topic', controls:'Best Practices', impact:'Business Value', chain:'Common Failure Paths'};
    Object.entries(labels).forEach(([intent,label])=>{
      const btn = shell.querySelector(`.simpilot-chip[data-intent="${intent}"]`);
      if(btn) btn.textContent = label;
    });
    const labelEl = shell.querySelector('.simpilot-section-label');
    if(labelEl) labelEl.textContent = mode === 'analysis' ? 'Quick Guidance' : (mode === 'exploration' ? 'Explore Guidance' : 'Learning Guidance');
  }
  function renderAdaptiveGuidance(intent){
    const mode = adaptiveMode();
    if(mode === 'analysis') return '';
    const ctx = getCtx();
    const label = escapeHtml(ctx.label || 'Agentic Security Explorer');
    const next = nextExplorationHtml();
    if(mode === 'exploration'){
      if(intent === 'explain') return `<h4>What Is This?</h4><p><strong>Selected component:</strong> ${label}</p><p>${escapeHtml(insightText())}</p>${next}<div class="simpilot-note">Exploration Mode uses the selected component or visible page context to guide what to inspect next.</div>`;
      if(intent === 'controls') return `<h4>Common Risks</h4><p><strong>Selected component:</strong> ${label}</p><ul><li>Unsafe trust in context, memory, messages, or tool output.</li><li>Over-permissioned actions that convert agent decisions into real-world impact.</li><li>Weak monitoring or missing containment during runtime behavior.</li></ul>${next}<div class="simpilot-note">Select a specific risk to switch Simpilot into Analysis Mode.</div>`;
      if(intent === 'impact') return `<h4>Security Focus</h4><p><strong>Selected component:</strong> ${label}</p><ul><li>Clarify trust boundaries around this component.</li><li>Identify what data, tools, or identities this component can influence.</li><li>Look for how local failure could chain into business impact.</li></ul>${next}`;
      if(intent === 'chain') return `<h4>Next Exploration</h4><p>Continue by inspecting related components or threats that commonly connect to <strong>${label}</strong>.</p>${next}<div class="simpilot-note">Simpilot recommends adjacent topics using the local ASE knowledge model.</div>`;
    }
    // learning mode
    if(intent === 'explain') return `<h4>Explain Topic</h4><p>ASE helps you understand agentic AI systems by connecting architecture components, threats, incident chains, security patterns, and business impact.</p>${next}<div class="simpilot-note">Start with the Explorer if you want a visual walkthrough, or use Learning for a structured path.</div>`;
    if(intent === 'controls') return `<h4>Best Practices</h4><ul><li>Separate trusted instructions from untrusted content.</li><li>Constrain tool use with explicit authorization and approval gates.</li><li>Protect memory and retrieval with provenance and validation.</li><li>Monitor runtime behavior and preserve audit evidence.</li></ul>${next}`;
    if(intent === 'impact') return `<h4>Business Value</h4><p>ASE translates technical agentic risks into business outcomes such as operational disruption, data exposure, unauthorized action, regulatory exposure, and reputation impact.</p>${next}`;
    if(intent === 'chain') return `<h4>Common Failure Paths</h4><ul><li>Prompt injection influences context or planning.</li><li>Poisoned memory or retrieval persists unsafe instructions.</li><li>Tool access turns reasoning into unauthorized action.</li><li>Runtime blind spots allow the chain to complete unnoticed.</li></ul>${next}`;
    return '';
  }
  function bullets(items){ const cleanItems = (items || []).map(x=>clean(x)).filter(Boolean); return cleanItems.length ? `<ul>${cleanItems.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul>` : ''; }
  function genericControlsFor(snapshot){
    const items = [];
    if(snapshot.mitigation) items.push(snapshot.mitigation);
    snapshot.controls.forEach(x=>items.push(x));
    const text = (snapshot.name + ' ' + snapshot.impact + ' ' + snapshot.mitigation).toLowerCase();
    if(/isolation|sandbox|escape|boundary|segmentation/.test(text)) items.push('Enforce per-agent execution boundaries and separate workspace, memory, and runtime contexts.','Add containment, termination, and audit controls for cross-agent or cross-tool behavior.');
    else if(/tool|mcp|api|function|action/.test(text)) items.push('Apply scoped tool permissions, allowlisted actions, and approval gates for high-impact calls.','Log tool inputs, outputs, caller identity, and downstream effects for investigation.');
    else if(/prompt|instruction|injection|jailbreak/.test(text)) items.push('Sanitize and label untrusted instructions from retrieved content, files, and tool output.','Apply instruction hierarchy, prompt injection detection, and deny rules for policy override attempts.');
    else if(/identity|credential|secret|token|privilege|access/.test(text)) items.push('Use least-privilege identities with short-lived credentials and explicit authorization boundaries.','Monitor privileged agent actions and require step-up approval for sensitive operations.');
    else if(/memory|retrieval|rag|poison|context/.test(text)) items.push('Separate trusted and untrusted memory, validate retrieved context, and expire stale or sensitive entries.','Track provenance for memory writes and retrieval sources.');
    else items.push('Define explicit prevention, detection, and containment controls for this risk.','Capture audit evidence that links the risk, selected component, and applied controls.');
    return [...new Set(items)].slice(0,5);
  }
  function renderContextRich(intent){
    const snap = activeRiskSnapshot();
    const component = activeComponentName();
    const title = escapeHtml(snap.name || getCtx().label);
    const riskLine = state.risk ? `<p><strong>Selected risk:</strong> ${title}</p>` : `<p><strong>Current context:</strong> ${escapeHtml(getCtx().label)}</p>`;
    if(intent === 'explain') return `<h4>Explain Risk</h4>${riskLine}<p><strong>Component:</strong> ${escapeHtml(component)}</p><p>${escapeHtml(snap.insight)}</p>${snap.impact ? `<h5>Why It Matters</h5><p>${escapeHtml(snap.impact)}</p>` : ''}${snap.mitigation ? `<h5>Existing Mitigation</h5><p>${escapeHtml(snap.mitigation)}</p>` : ''}<div class="simpilot-note">Use this as a concise risk explanation for workshops, threat modeling notes, or review discussions.</div>`;
    if(intent === 'controls') return `<h4>Recommended Controls</h4>${riskLine}<p><strong>Component:</strong> ${escapeHtml(component)}</p>${bullets(genericControlsFor(snap))}<h5>Control Objective</h5><p>Reduce likelihood, limit blast radius, and produce audit evidence when this risk appears in an agent workflow.</p><div class="simpilot-note">Controls are generated locally from the selected ASE context and visible risk details.</div>`;
    if(intent === 'impact'){
      const impacts = snap.impacts.length ? snap.impacts : [snap.impact || 'Operational disruption', 'Governance or audit exposure', 'Expanded blast radius across agent workflows'];
      return `<h4>Business Impact</h4>${riskLine}<p><strong>Component:</strong> ${escapeHtml(component)}</p>${bullets(impacts)}<h5>Executive Framing</h5><p>This risk should be explained in terms of business process disruption, unauthorized action, data exposure, audit readiness, or loss of control over agent behavior.</p><div class="simpilot-note">Use this for non-technical stakeholder communication.</div>`;
    }
    if(intent === 'chain'){
      if(snap.chains.length) return `<h4>Incident Chain</h4>${riskLine}<p><strong>Related chain candidates:</strong></p>${bullets(snap.chains)}<h5>How It Can Progress</h5><p>A local weakness in ${escapeHtml(component)} can combine with prompt, memory, identity, or tool weaknesses and become a broader incident chain.</p><div class="simpilot-note">Related chains are based on the selected ASE risk when available.</div>`;
      return `<h4>Incident Chain</h4>${riskLine}<p><strong>Plausible local chain:</strong></p><ul><li>A selected risk appears in ${escapeHtml(component)}.</li><li>The agent trusts or acts on unsafe context, permissions, memory, or tool behavior.</li><li>The weakness crosses a boundary such as data, identity, runtime, or workflow scope.</li><li>Business impact appears as disruption, unauthorized action, data exposure, or audit concern.</li></ul><div class="simpilot-note">No explicit related chain was visible, so Simpilot generated a local chain pattern from the selected context.</div>`;
    }
    return '';
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
    if(intent !== 'freeform'){
      const adaptive = renderAdaptiveGuidance(intent);
      if(adaptive){
        shell.querySelector('[data-simpilot-output]').innerHTML = adaptive;
        shell.classList.add('open');
        updateContextUI();
        return;
      }
      const rich = renderContextRich(intent);
      if(rich){
        shell.querySelector('[data-simpilot-output]').innerHTML = rich;
        shell.classList.add('open');
        updateContextUI();
        return;
      }
    }
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



  function scanExpandedAse3Risk(){
    if(!shell) return;
    const expanded = document.querySelector('.risk-chip.expanded .rname');
    const name = clean(expanded?.textContent || '');
    const recentRiskClick = Date.now() - riskInteractionAt < 1800;
    if(name && (recentRiskClick || state.type === 'risk') && name !== state.risk) setContext(name,'risk');
    updateAse3Dock();
  }

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
    // True Option 2 behavior: move left only when a real ASE3 node/component is selected.
    // ASE3 keeps its right-side details container in the DOM even before exploration starts,
    // so visual panel detection is too aggressive. The reliable signal is the active node.
    const activeNode = document.querySelector('.node-hit.active, g.node-hit.active, [id^="node-"].active');
    if(activeNode) return true;

    // Fallback for future ASE3 variants that may expose selected component state through body/class attributes.
    const bodySignal = document.body?.getAttribute('data-active-component') || document.body?.getAttribute('data-selected-component');
    if(bodySignal && bodySignal.trim()) return true;

    return false;
  }


  function isMobileViewport(){
    return window.matchMedia && window.matchMedia('(max-width: 700px)').matches;
  }

  function ase3MobileRightSideBusy(){
    if(!isMobileViewport()) return false;
    if(document.querySelector('.risk-chip.expanded, .node-hit.active')) return true;
    const rightish = ['.risk-body','.defense-panel','.business-impact-panel','.chain-panel','.details-panel','.node-details','.right-panel'];
    return rightish.some(sel => {
      const el = document.querySelector(sel);
      if(!el) return false;
      const s = window.getComputedStyle(el);
      if(s.display === 'none' || s.visibility === 'hidden') return false;
      const r = el.getBoundingClientRect();
      return r.width > 80 && r.height > 60 && r.right > window.innerWidth * 0.55;
    });
  }

  function updateAse3Dock(){
    if(!shell || !isAse3Page()) return;
    const moveLeft = isMobileViewport() ? (ase3DetailsOpen() || ase3MobileRightSideBusy()) : ase3DetailsOpen();
    shell.classList.toggle('simpilot-left-mode', moveLeft);
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

  loadData().then(()=>{ injectSimpilotStyles(); shell = makeShell(); updateContextUI(); startAse3DockObserver(); document.addEventListener('click', inferFromClick, true); document.addEventListener('click',()=>setTimeout(scanExpandedAse3Risk,0), true); setInterval(scanExpandedAse3Risk, 1200); });
})();
