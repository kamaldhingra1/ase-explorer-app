# AI Security Threat Modeling Cheat Sheet

Use this document while performing a threat model.

If you're stuck, start at the top and work downward.

---

# The Four Questions

1. What are we working on?
2. What can go wrong?
3. What will we do about it?
4. Did we do a good job?

If you can't answer #1, stop and improve the diagram.

---

# Threat Modeling Workflow

Scope
↓
Components
↓
Data Flows
↓
Trust Boundaries
↓
Threats
↓
Risk
↓
Controls
↓
Validation

---

# Trust Boundaries

Most AI attacks happen where trust changes.

| Boundary | Question |
|-----------|-----------|
| Human Boundary | Can users influence behavior? |
| Instruction Boundary | Can data become instructions? |
| Memory Boundary | Can persistence influence future sessions? |
| Data Boundary | Can retrieved content be manipulated? |
| Tool Boundary | Can reasoning create actions? |
| Provider Boundary | Does information leave organizational control? |

---

# AI Components

| Component | Primary Risk |
|-----------|-----------|
| UI | Prompt Injection |
| Gateway | Abuse / DoS |
| Guardrails | Bypass |
| Orchestrator | Central Compromise |
| LLM | Injection / Leakage |
| Retriever | Manipulation |
| Vector Store | Poisoning |
| Memory | Persistence |
| Tool | Excessive Agency |
| Policy Engine | Policy Bypass |
| MCP Server | Tool Abuse |
| Audit Service | Attribution Failure |

---

# OWASP LLM Top 10

| ID | Category |
|------|------|
| LLM01 | Prompt Injection |
| LLM02 | Sensitive Information Disclosure |
| LLM03 | Excessive Agency |
| LLM04 | Supply Chain |
| LLM05 | Data & Model Poisoning |
| LLM06 | Unbounded Consumption |
| LLM07 | Misinformation |
| LLM08 | Hidden Context Exposure |
| LLM09 | Vector & Embedding Weaknesses |
| LLM10 | Improper Output Handling |

---

# MITRE ATLAS

| ID | Meaning |
|------|------|
| AML.T0051 | Prompt Injection |
| AML.T0020 | ML Artifact Poisoning |
| AML.T0024 | Exfiltration via Inference |
| AML.T0025 | Model Extraction |
| AML.T0043 | Denial of ML Service |
| AML.T0010 | Supply Chain Compromise |
| AML.T0054 | Excessive Agency |

---

# STRIDE

| Category | Ask Yourself |
|------|------|
| Spoofing | Who is pretending to be someone else? |
| Tampering | What can be modified? |
| Repudiation | What actions cannot be proven? |
| Information Disclosure | What can leak? |
| Denial of Service | What can be exhausted? |
| Elevation of Privilege | What can gain more authority? |

---

# Kill Chain

Recon
↓
Access
↓
Execution
↓
Persistence
↓
Exfiltration
↓
Impact

Best place to stop an attack:

Access or Persistence

Worst place:

Impact

---

# RAG Security

Look for:

✅ Indirect Prompt Injection

✅ Index Poisoning

✅ Retrieval Manipulation

✅ Prompt Leakage

✅ Sensitive Information Disclosure

Critical Flows:

DF-07 → Provider

DF-12 → Memory

---

# Agent Security

Look for:

✅ Excessive Agency

✅ Tool Abuse

✅ Goal Drift

✅ Delegation Abuse

✅ Agent Collusion

✅ Autonomous Escalation

---

# Memory Security

Look for:

✅ Memory Poisoning

✅ Cross-Session Leakage

✅ False Fact Persistence

✅ Goal Manipulation

✅ Replay Attacks

Strongest Controls:

- Isolation
- Expiration
- Provenance
- Validation

---

# MCP & Tool Security

Tools = Authority

Questions:

- What can this tool do?
- Should it be able to do that?
- Does it need all those permissions?
- Is approval required?
- Can it be audited?

Strongest Control:

Least Privilege

---

# Red Team Checklist

Can we:

□ Prompt inject it?

□ Poison retrieval?

□ Poison memory?

□ Abuse tools?

□ Escape boundaries?

□ Trigger autonomy growth?

□ Exfiltrate data?

□ Bypass controls?

If yes → create findings.

---

# Five Design Rules

1. Data is not instructions.
2. Tools are authority.
3. Memory creates persistence.
4. Policies should live outside models.
5. Trust boundaries deserve scrutiny.

---

# Five Questions Before Sign-Off

1. Where is my highest-risk trust boundary?
2. What is the easiest attack chain?
3. What creates persistence?
4. What creates business impact?
5. How would I verify my controls work?

If all five are answered, the threat model is likely ready for review.