
const ASE_KB = {
  memory: {
    title: 'Memory and Context Risk',
    answer: 'Memory risk usually appears when untrusted, stale, or sensitive context is stored and reused by an agent. Key defenses include memory provenance, retention limits, context validation, and separation of trusted and untrusted memory.',
    patterns: ['Memory Protection', 'Input and Context Validation'],
    impact: ['Persistent attacker influence', 'Sensitive data exposure', 'Incorrect workflow behavior']
  },
  tool: {
    title: 'Tool and Action Risk',
    answer: 'Tool risk appears when model intent becomes real action through APIs, plugins, MCP services, or business systems. Key defenses include tool allowlists, scoped authorization, parameter validation, approval gates, and monitoring.',
    patterns: ['Tool Governance and Authorization', 'Runtime Monitoring and Containment'],
    impact: ['Unauthorized transactions', 'Data exfiltration', 'Service abuse']
  },
  identity: {
    title: 'Agent Identity and Access Risk',
    answer: 'Agent identity risk appears when agents act without clear accountability, scoped permissions, or safe credential handling. Treat agents as accountable actors with scoped authorization, secret isolation, delegation boundaries, and audit trails.',
    patterns: ['Agent Identity and Access Control', 'Tool Governance and Authorization'],
    impact: ['Unauthorized access', 'Regulatory exposure', 'Financial loss']
  },
  runtime: {
    title: 'Runtime Security Risk',
    answer: 'Runtime risk appears while agent workflows execute. Use runtime policy checks, sandboxing, telemetry, kill switches, and human approval to contain unsafe behavior before it becomes business impact.',
    patterns: ['Runtime Monitoring and Containment', 'Tool Governance and Authorization'],
    impact: ['Operational disruption', 'Safety concerns', 'Loss of control']
  },
  prompt: {
    title: 'Prompt Injection and Context Manipulation',
    answer: 'Prompt injection attempts to override instructions, manipulate context, or influence tool use. Treat it as an input, context, and action-control problem, not only a model problem.',
    patterns: ['Input and Context Validation', 'Tool Governance and Authorization'],
    impact: ['Incorrect actions', 'Data leakage', 'Privilege misuse']
  },
  incident: {
    title: 'Incident Chain Thinking',
    answer: 'A single weakness may not explain business impact. Incident chains help show how component risk, tool access, identity, memory, and runtime behavior combine into larger failure paths.',
    patterns: ['Runtime Monitoring and Containment', 'Agent Identity and Access Control', 'Memory Protection'],
    impact: ['Operational disruption', 'Regulatory exposure', 'Reputation impact']
  },
  business: {
    title: 'Business Impact View',
    answer: 'ASE maps technical risks to business outcomes such as operational disruption, financial loss, regulatory exposure, reputation impact, and safety concerns. This keeps security conversations understandable outside engineering teams.',
    patterns: ['Runtime Monitoring and Containment', 'Tool Governance and Authorization', 'Agent Identity and Access Control'],
    impact: ['Operational', 'Financial', 'Regulatory', 'Reputation', 'Safety']
  },
  default: {
    title: 'Ask ASE Preview',
    answer: 'Ask ASE is a lightweight, rule-based preview. Try asking about memory, tools, identity, runtime, prompt injection, incidents, or business impact. Future versions can become a fuller context-aware assistant.',
    patterns: ['Input and Context Validation', 'Tool Governance and Authorization', 'Runtime Monitoring and Containment'],
    impact: ['Learning support', 'Threat understanding', 'Control guidance']
  }
};
function askAseAnswer(q){
  const x=(q||'').toLowerCase();
  if(x.includes('memory') || x.includes('rag') || x.includes('context')) return ASE_KB.memory;
  if(x.includes('tool') || x.includes('mcp') || x.includes('api') || x.includes('plugin')) return ASE_KB.tool;
  if(x.includes('identity') || x.includes('credential') || x.includes('auth') || x.includes('access')) return ASE_KB.identity;
  if(x.includes('runtime') || x.includes('sandbox') || x.includes('monitor') || x.includes('policy')) return ASE_KB.runtime;
  if(x.includes('prompt') || x.includes('injection')) return ASE_KB.prompt;
  if(x.includes('incident') || x.includes('chain') || x.includes('attack path')) return ASE_KB.incident;
  if(x.includes('business') || x.includes('impact') || x.includes('executive')) return ASE_KB.business;
  return ASE_KB.default;
}
function renderAskAse(container, payload){
  container.innerHTML = `
    <h4>${payload.title}</h4>
    <p>${payload.answer}</p>
    <div class="ask-ase-cols">
      <div><strong>Security patterns</strong><ul>${payload.patterns.map(x=>`<li>${x}</li>`).join('')}</ul></div>
      <div><strong>Possible impact</strong><ul>${payload.impact.map(x=>`<li>${x}</li>`).join('')}</ul></div>
    </div>
    <p class="small muted">ASE-first guidance. Framework mappings can be added as optional overlays later.</p>`;
}
function setupAskAse(){
  document.querySelectorAll('[data-ask-ase]').forEach(panel=>{
    const input=panel.querySelector('[data-ask-input]');
    const output=panel.querySelector('[data-ask-output]');
    const buttons=panel.querySelectorAll('[data-ask-prompt]');
    const run=()=>renderAskAse(output, askAseAnswer(input.value));
    panel.querySelector('[data-ask-run]')?.addEventListener('click',run);
    input?.addEventListener('keydown',e=>{ if(e.key==='Enter') run(); });
    buttons.forEach(btn=>btn.addEventListener('click',()=>{ input.value=btn.dataset.askPrompt; run(); }));
    renderAskAse(output, ASE_KB.default);
  });
}
document.addEventListener('DOMContentLoaded', setupAskAse);
