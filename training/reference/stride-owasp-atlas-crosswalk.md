# AI Threat Modeling Crosswalk
# STRIDE ↔ OWASP LLM Top 10 ↔ MITRE ATLAS

Use this matrix when converting a threat into:

- Threat Category
- Attack Technique
- Mitigation
- Risk Statement

---

# Prompt Injection

| Framework | Mapping |
|------------|------------|
| STRIDE | Spoofing, Tampering |
| OWASP | LLM01 |
| ATLAS | AML.T0051 |
| Primary Risk | Instruction Hijacking |
| Common Control | Input Validation, Context Sanitization |

Examples:

- Direct Prompt Injection
- Indirect Prompt Injection
- Context Confusion

---

# Sensitive Information Disclosure

| Framework | Mapping |
|------------|------------|
| STRIDE | Information Disclosure |
| OWASP | LLM02 |
| ATLAS | AML.T0024 |
| Primary Risk | Data Leakage |
| Common Control | Redaction, Data Classification |

Examples:

- Customer Record Exposure
- Secret Leakage
- Prompt Leakage

---

# Supply Chain Compromise

| Framework | Mapping |
|------------|------------|
| STRIDE | Tampering |
| OWASP | LLM03 |
| ATLAS | AML.T0010 |
| Primary Risk | Trusted Component Compromise |
| Common Control | Provenance Validation |

Examples:

- Compromised MCP Server
- Malicious Package
- Poisoned Foundation Model

---

# Data & Model Poisoning

| Framework | Mapping |
|------------|------------|
| STRIDE | Tampering |
| OWASP | LLM04 |
| ATLAS | AML.T0020 |
| Primary Risk | Persistence |
| Common Control | Ingestion Validation |

Examples:

- Vector DB Poisoning
- Memory Poisoning
- Training Data Poisoning

---

# Improper Output Handling

| Framework | Mapping |
|------------|------------|
| STRIDE | Elevation of Privilege, Tampering |
| OWASP | LLM05 |
| ATLAS | AML.T0051 (Commonly Associated) |
| Primary Risk | Code Execution |
| Common Control | Output Validation |

Examples:

- SQL Injection Through Output
- Command Injection
- Untrusted Rendering

---

# Excessive Agency

| Framework | Mapping |
|------------|------------|
| STRIDE | Elevation of Privilege |
| OWASP | LLM06 |
| ATLAS | AML.T0054 |
| Primary Risk | Unauthorized Actions |
| Common Control | Least Privilege |

Examples:

- Tool Abuse
- Action Chaining
- Autonomous Escalation

---

# System Prompt Leakage

| Framework | Mapping |
|------------|------------|
| STRIDE | Information Disclosure |
| OWASP | LLM07 |
| ATLAS | AML.T0051 |
| Primary Risk | Security Bypass |
| Common Control | Remove Secrets From Prompts |

Examples:

- Prompt Extraction
- Template Leakage

---

# Vector & Embedding Weaknesses

| Framework | Mapping |
|------------|------------|
| STRIDE | Tampering |
| OWASP | LLM08 |
| ATLAS | AML.T0020 |
| Primary Risk | Retrieval Manipulation |
| Common Control | Provenance Controls |

Examples:

- Ranking Manipulation
- Embedding Abuse

---

# Misinformation

| Framework | Mapping |
|------------|------------|
| STRIDE | Information Disclosure |
| OWASP | LLM09 |
| ATLAS | AML.T0052 |
| Primary Risk | Incorrect Decisions |
| Common Control | Verification & Grounding |

Examples:

- Hallucinations
- Fake Citations

---

# Unbounded Consumption

| Framework | Mapping |
|------------|------------|
| STRIDE | Denial of Service |
| OWASP | LLM10 |
| ATLAS | AML.T0043 |
| Primary Risk | Resource Exhaustion |
| Common Control | Quotas & Limits |

Examples:

- Context Flooding
- Infinite Loops
- Cost Amplification

---

# Fast Mapping Workflow

Threat
↓
OWASP
↓
ATLAS
↓
STRIDE
↓
Control
↓
Validation Test

Use this sequence in every threat report.