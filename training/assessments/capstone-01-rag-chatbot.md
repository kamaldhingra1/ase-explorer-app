# Capstone Exercise #1
# Threat Model a RAG Enterprise Knowledge Assistant

Difficulty: Intermediate

Recommended Time: 45-60 Minutes

Applicable Lessons:

- 01 Primer
- 02 Four Questions
- 03 Trust Zones
- 03A AI Trust Boundaries
- 04 Components
- 05 OWASP LLM Top 10
- 06 MITRE ATLAS
- 06A AI Attack Chains
- 07 AI-Augmented STRIDE
- 08 Mitigations & Controls
- 09 RAG GenAI

---

# Scenario

Your organization is deploying an internal AI knowledge assistant.

Employees can ask questions about:

- SOPs
- Product Documentation
- Quality Procedures
- Technical Manuals
- HR Policies

The application uses:

- Web Chat Interface
- API Gateway
- Input Guardrails
- Orchestrator
- Embedding Service
- Vector Database
- Retriever
- LLM Provider
- Output Guardrails
- Conversation Memory

Documents are uploaded through an ingestion pipeline and indexed into the vector database.

The system uses an external LLM provider.

Users cannot directly access the vector database.

---

# Architecture

User
→ Chat UI
→ API Gateway
→ Input Guardrails
→ Orchestrator
→ Retriever
→ Vector Database

Orchestrator
→ LLM Provider

LLM Provider
→ Output Guardrails
→ User

User
→ Conversation Memory

Memory
→ Orchestrator

Document Upload
→ ETL Pipeline
→ Vector Database

---

# Objectives

Perform a threat model for this architecture.

Identify:

- Components
- Data Flows
- Trust Boundaries
- Threats
- Attack Chains
- Mitigations

---

# Part 1 – Components

Create a component inventory.

Template:

| AI-ID | Component | Purpose | Trust Zone |
|---------|---------|---------|---------|
| AI-01 | | | |

Minimum required:

- 10 components

---

# Part 2 – Data Flows

Create a data-flow inventory.

Template:

| DF-ID | Source | Destination | Data |
|---------|---------|---------|---------|
| DF-01 | | | |

Minimum required:

- 10 flows

---

# Part 3 – Trust Boundaries

Create:

| TB-ID | Boundary | Trust Change |
|---------|---------|---------|

Minimum required:

- Human Boundary
- Provider Boundary
- Memory Boundary
- Data Boundary

---

# Part 4 – OWASP Analysis

Identify at least:

| Threat | OWASP |
|---------|---------|

Minimum:

- 5 threats

Consider:

- Prompt Injection
- Disclosure
- Poisoning
- Vector Weaknesses
- Misinformation

---

# Part 5 – MITRE ATLAS Analysis

Map:

| Threat | ATLAS Technique |
|---------|---------|

Minimum:

- 5 mappings

Consider:

- AML.T0051
- AML.T0020
- AML.T0024
- AML.T0043
- AML.T0025

---

# Part 6 – STRIDE Analysis

Identify:

| Threat | STRIDE Category |
|---------|---------|

Minimum:

- One example per STRIDE category

Required:

- Spoofing
- Tampering
- Repudiation
- Information Disclosure
- Denial of Service
- Elevation of Privilege

---

# Part 7 – Attack Chain

Build a kill chain.

Template:

Reconnaissance:
_____________________

Initial Access:
_____________________

Execution:
_____________________

Persistence:
_____________________

Exfiltration:
_____________________

Impact:
_____________________

---

# Part 8 – Highest-Risk Findings

List the five highest-risk findings.

Template:

| Risk | Impact | Likelihood | Rating |
|---------|---------|---------|---------|

---

# Part 9 – Mitigations

Document mitigations.

Template:

| Threat | Control | Location |
|---------|---------|---------|

Include:

- Technical Controls
- Process Controls
- Monitoring Controls

---

# Part 10 – Red Team Validation Plan

Design:

- 2 Prompt Injection Tests
- 1 Poisoning Test
- 1 Memory Test
- 1 Disclosure Test

For each test identify:

- Attack
- Expected Result
- Successful Mitigation

---

# Deliverable

Prepare a final report containing:

1. System Overview
2. Component Inventory
3. Data Flows
4. Trust Boundaries
5. Threat Analysis
6. Risk Assessment
7. Mitigations
8. Residual Risk

---

# Scoring Rubric

Component Inventory: 10%

Data Flow Inventory: 10%

Trust Boundaries: 10%

OWASP Mapping: 15%

ATLAS Mapping: 15%

STRIDE Analysis: 10%

Attack Chain: 10%

Mitigations: 10%

Red-Team Plan: 10%

Total: 100%

---

# Expert Challenge

Additional Requirements:

- Identify the confidentiality boundary.
- Identify the persistence boundary.
- Identify the highest-value control point.
- Describe how an attacker could poison the corpus.
- Describe how memory alters attacker economics.

Bonus:

Map every threat to:

- OWASP
- ATLAS
- STRIDE

simultaneously.