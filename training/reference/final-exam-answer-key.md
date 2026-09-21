# AI Security Threat Modeling Final Assessment
# Instructor Answer Key

## Foundations (Q01-Q10)

| Q | Answer | Lesson |
|----|----|----|
| 01 | C | 01 Primer |
| 02 | B | 02 Four Questions |
| 03 | B | 03A Trust Boundaries |
| 04 | B | 04 Components |
| 05 | C | 04 Components |
| 06 | C | 03 Trust Zones |
| 07 | C | 03A Trust Boundaries |
| 08 | B | 04 Components |
| 09 | A | 01 Primer |
| 10 | B | 01 Primer |

### Rationales

Q01: Threat modeling identifies threats before deployment.

Q02: "What are we working on?" establishes scope.

Q03: Trust boundaries exist where assumptions change.

Q04: AI- prefixes identify components.

Q05: DF- prefixes identify data flows.

Q06: TB- prefixes identify trust boundaries.

Q07: Most attacks occur at trust transitions.

Q08: Traceability provides evidence-based findings.

Q09: Threat modeling is most effective during design.

Q10: Risk reduction, not risk elimination, is the goal.

---

## Components & Boundaries (Q11-Q20)

| Q | Answer | Lesson |
|----|----|----|
| 11 | B | 04 Components |
| 12 | C | 04 Components |
| 13 | B | 03A Trust Boundaries |
| 14 | C | 03A Trust Boundaries |
| 15 | A | 03A Trust Boundaries |
| 16 | B | 05 OWASP |
| 17 | A | 10 Single Agent |
| 18 | B | 10A Memory Security |
| 19 | B | 03A Trust Boundaries |
| 20 | C | 12A MCP Security |

### Rationales

Q11: The orchestrator concentrates prompts, instructions, and logic.

Q12: Tools convert thinking into action.

Q13: Tool boundaries represent execution authority.

Q14: Provider boundaries transfer control externally.

Q15: Retrieval attacks target the data boundary.

Q16: Indirect injection typically arrives through trusted content.

Q17: Excessive agency manifests through tool access.

Q18: Memory introduces persistence.

Q19: Controls are strongest at trust transitions.

Q20: Policy Engines decide whether actions are allowed.

---

## OWASP LLM Top 10 (Q21-Q30)

| Q | Answer |
|----|----|
| 21 | A |
| 22 | B |
| 23 | B |
| 24 | A |
| 25 | C |
| 26 | A |
| 27 | C |
| 28 | A |
| 29 | A |
| 30 | B |

### Rationales

Q21: LLM01 is Prompt Injection.

Q22: LLM02 is Sensitive Information Disclosure.

Q23: LLM04 is Data & Model Poisoning.

Q24: LLM05 is Improper Output Handling.

Q25: LLM06 is Excessive Agency.

Q26: LLM07 is System Prompt Leakage.

Q27: LLM08 is Vector & Embedding Weaknesses.

Q28: LLM09 is Misinformation.

Q29: LLM10 focuses on resource exhaustion and cost.

Q30: Executing model output without validation is improper output handling.

---

## MITRE ATLAS & Kill Chains (Q31-Q35)

| Q | Answer |
|----|----|
| 31 | A |
| 32 | C |
| 33 | B |
| 34 | B |
| 35 | C |

### Rationales

Q31: AML.T0051 is Prompt Injection.

Q32: AML.T0020 is ML Artifact Poisoning.

Q33: AML.T0024 is Exfiltration via ML Inference.

Q34: Prompt Injection occurs during execution.

Q35: Long-lived poisoning represents persistence.
## STRIDE (Q36-Q40)

| Q | Answer |
|----|----|
| 36 | C |
| 37 | A |
| 38 | A |
| 39 | A |
| 40 | B |

### Rationales

Q36: Spoofing addresses impersonation.

Q37: Tampering addresses modification.

Q38: Prompt injection often represents spoofing or tampering.

Q39: Information Disclosure addresses data leakage.

Q40: Denial of Service addresses resource exhaustion.

---

## RAG Security (Q41-Q47)

| Q | Answer |
|----|----|
| 41 | C |
| 42 | B |
| 43 | A |
| 44 | C |
| 45 | C |
| 46 | B |
| 47 | B |

### Rationales

Q41: RAG stands for Retrieval Augmented Generation.

Q42: Indirect Prompt Injection is the defining RAG threat.

Q43: Poisoned data survives retrieval cycles.

Q44: Orchestrator → Provider is the confidentiality boundary.

Q45: Retrieved content should be treated as untrusted.

Q46: Malicious indexed content equals index poisoning.

Q47: Provenance and validation are primary defenses.

---

## Single- and Multi-Agent (Q48-Q54)

| Q | Answer |
|----|----|
| 48 | C |
| 49 | B |
| 50 | B |
| 51 | B |
| 52 | B |
| 53 | A |
| 54 | B |

### Rationales

Q48: Tools create real-world impact.

Q49: Excessive agency means excessive permissions.

Q50: Unnecessary capabilities are excessive agency.

Q51: Shared state and delegation introduce new risk.

Q52: Multiple agents reinforcing harmful behavior is collusion.

Q53: Shared coordination propagates attacks.

Q54: Per-agent least privilege limits blast radius.

---

## Autonomous Agents (Q55-Q60)

| Q | Answer |
|----|----|
| 55 | B |
| 56 | A |
| 57 | B |
| 58 | B |
| 59 | C |
| 60 | A |

### Rationales

Q55: Autonomy reduces human oversight.

Q56: External observations repeatedly enter the loop.

Q57: Goal drift expands beyond intended objectives.

Q58: This tests autonomy constraints.

Q59: Kill switches must remain independent.

Q60: Unbounded reflection creates self-modification risk.

---

## Memory Security (Q61-Q65)

| Q | Answer |
|----|----|
| 61 | A |
| 62 | B |
| 63 | B |
| 64 | C |
| 65 | C |

### Rationales

Q61: Memory poisoning is a persistence attack.

Q62: Cross-session leakage is an isolation failure.

Q63: Stored influence equals memory poisoning.

Q64: Memory → Agent reintroduces stored content.

Q65: Isolation is the strongest mitigation.

---

## MCP & Tool Ecosystem Security (Q66-Q68)

| Q | Answer |
|----|----|
| 66 | A |
| 67 | B |
| 68 | C |

### Rationales

Q66: Legitimate tool, illegitimate purpose = tool abuse.

Q67: Least privilege minimizes blast radius.

Q68: Tool outputs must be treated as untrusted data.

---

## AI Red Teaming (Q69-Q70)

| Q | Answer |
|----|----|
| 69 | C |
| 70 | B |

### Rationales

Q69: An untested threat model remains a hypothesis.

Q70: Red teaming validates controls under adversarial conditions.

---

# Scoring Guide

| Score | Rating |
|---------|---------|
| 95-100% | Expert |
| 85-94% | Advanced Practitioner |
| 70-84% | Proficient |
| 50-69% | Developing |
| Below 50% | Needs Additional Training |

---

# Domain Breakdown

| Domain | Questions |
|----------|----------|
| Foundations | 1-10 |
| Components & Trust Boundaries | 11-20 |
| OWASP LLM Top 10 | 21-30 |
| MITRE ATLAS & Kill Chains | 31-35 |
| STRIDE | 36-40 |
| RAG Security | 41-47 |
| Single & Multi-Agent | 48-54 |
| Autonomous Agents | 55-60 |
| Memory Security | 61-65 |
| MCP Security | 66-68 |
| AI Red Teaming | 69-70 |