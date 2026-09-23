# AI Security Threat Modeling Training
# Enterprise Curriculum & Workshop Guide

A hands-on curriculum that uses the AI Threat Modeler as a teaching tool.

Students learn how AI systems work, how to decompose architectures, identify threats, evaluate risks, design mitigations, validate controls, and communicate findings.

The curriculum is designed for:

- Security Architects
- Application Security Engineers
- Cloud Security Engineers
- Threat Modelers
- AI Engineers
- Platform Engineers
- Governance, Risk & Compliance Teams

The course combines:

- Microsoft Threat Modeling principles
- OWASP LLM Top 10
- OWASP Agentic AI Top 10
- MITRE ATLAS
- AI-Augmented STRIDE
- AI Architecture Patterns
- Agent Security
- MCP Security
- AI Red Teaming

---

# Learning Model

Every lesson follows the same loop:

## Try

Predict threats before reading.

## Learn

Understand concepts, frameworks, and attack patterns.

## Play

Run the architecture through the Threat Modeler and compare findings.

## Check

Validate understanding through exercises and quizzes.

## Apply

Modify the pattern and observe how findings change.

The objective is not memorization.

The objective is threat-modeling intuition.

---

# Curriculum Map

## Foundations

| # | Lesson | Core Learning |
|------|------|------|
| 01 | Threat Modeling Primer | Threat modeling fundamentals |
| 02 | The Four Questions | Shostack methodology |
| 03 | Trust Zones & Data Flows | Flows, boundaries, attack surfaces |
| 03A | AI Trust Boundaries | Human, memory, tool, provider trust |
| 04 | AI Components & Attack Surface | Role taxonomy |
| 05 | OWASP LLM Top 10 | AI failure modes |
| 06 | MITRE ATLAS | Adversary techniques |
| 06A | AI Attack Chains & Kill Chains | Attack path analysis |
| 07 | AI-Augmented STRIDE | STRIDE applied to AI |
| 08 | Mitigations & Controls for AI | Defense-in-depth |

---

## Pattern Deep Dives

| # | Lesson | Core Learning |
|------|------|------|
| 09 | Deep Dive: RAG GenAI | Retrieval security |
| 10 | Deep Dive: Single Agent | Tool use and agency |
| 10A | Agent Memory Security | Persistence and memory attacks |
| 11 | Deep Dive: Multi-Agent | Delegation and shared-state risks |
| 12 | Deep Dive: Autonomous Agent | Autonomy and escalation |
| 12A | MCP & Tool Ecosystem Security | Tool governance and action security |
| 12B | AI Red Teaming & Adversarial Validation | Security validation |
| 12C | OWASP Agentic AI Top 10 | Agent-specific failure modes (A1–A10) |

---

## Wrap-Up

| # | Lesson | Core Learning |
|------|------|------|
| 13 | Writing the Threat Report | Risk communication |
| 14 | Governance & Handoff | Operationalization and oversight |

---

# Architecture Patterns

The curriculum centers around four architecture patterns.

## Pattern 1 – RAG GenAI

Focus Areas:

- Retrieval
- Vector Databases
- Memory
- Prompt Injection
- Data Poisoning

Primary Risks:

- Indirect Prompt Injection
- Index Poisoning
- Sensitive Information Disclosure
- Retrieval Manipulation

---

## Pattern 2 – Single Agent

Focus Areas:

- Tool Use
- Agency
- Planning
- Authorization

Primary Risks:

- Tool Abuse
- Excessive Agency
- Memory Misuse

---

## Pattern 3 – Multi-Agent

Focus Areas:

- Delegation
- Shared Memory
- Coordination

Primary Risks:

- Agent Collusion
- Shared-State Poisoning
- Delegation Abuse

---

## Pattern 4 – Autonomous Agent

Focus Areas:

- Planning
- Reflection
- Execution
- Oversight

Primary Risks:

- Goal Drift
- Observation Poisoning
- Autonomous Escalation
- Kill-Switch Failures

---

# Component Taxonomy

## Core Components

| ID | Component |
|------|------|
| AI-01 | User / Requester |
| AI-02 | Gateway |
| AI-03 | Guardrails |
| AI-04 | Orchestrator |
| AI-05 | Model / LLM |
| AI-06 | Embedding Model |
| AI-07 | Retriever |
| AI-08 | Provider |
| AI-09 | Store / Memory |
| AI-10 | Tool |
| AI-11 | Template Store |
| AI-12 | ETL Pipeline |

---

## Extended Agentic Components

| ID | Component |
|------|------|
| AI-17 | Policy Engine |
| AI-18 | Tool Broker |
| AI-19 | MCP Server |
| AI-20 | Audit Service |
| AI-21 | Boundary Detection |
| AI-22 | Behavior Monitor |

---

# Trust Boundaries

Students identify:

| Boundary | Purpose |
|------|------|
| TB-01 | Human Boundary |
| TB-02 | Instruction Boundary |
| TB-03 | Memory Boundary |
| TB-04 | Tool Boundary |
| TB-05 | Provider Boundary |
| TB-06 | Data Boundary |
| TB-07 | Approval Boundary |
| TB-08 | Monitoring Boundary |

Core Principle:

Most AI attacks occur where trust changes.

---

# Frameworks

## OWASP LLM Top 10

Students learn:

LLM01–LLM10

Including:

- Prompt Injection
- Sensitive Information Disclosure
- Data Poisoning
- Excessive Agency
- Vector Weaknesses
- Misinformation

---

## OWASP Agentic AI Top 10

Students learn the agent-specific failure-mode catalogue (2025):

A1–A10

Including:

- Unbounded Execution
- Excessive Agency
- Improper Input Handling
- Infinite Loops / Denial of Wallet
- Cascading Hallucinations
- Inadequate Human Oversight
- Unsafe Data Handling
- Insecure Communication / Data Chain
- Improper Output Handling
- Identity Spoofing

The agentic list augments (does not replace) the LLM Top 10: A2/A9 rename LLM06/LLM05, while A1, A5, A7, A8 and A10 only exist when software acts.

---

## MITRE ATLAS

Students map findings to:

- AML.T0051 Prompt Injection
- AML.T0020 ML Artifact Poisoning
- AML.T0024 Exfiltration
- AML.T0025 Model Extraction
- AML.T0043 DoS
- AML.T0010 Supply Chain
- AML.T0054 Excessive Agency

---

## AI-Augmented STRIDE

Students learn:

- Spoofing
- Tampering
- Repudiation
- Information Disclosure
- Denial of Service
- Elevation of Privilege

through an AI lens.

---

# Assessments

## Lesson Quizzes

Every lesson includes:

- Quick Check
- Scenario Questions
- Knowledge Validation

---

## Final Assessment

File:

assessments/final-exam-questions.md

Coverage:

- Foundations
- OWASP LLM Top 10
- OWASP Agentic AI Top 10
- MITRE ATLAS
- STRIDE
- Trust Boundaries
- Kill Chains
- RAG
- Agents
- Memory
- MCP
- Red Teaming

Total Questions:

70

Instructor Key:

assessments/final-exam-answer-key.md

Passing Score:

80%

---

# Capstone Exercises

## Capstone #1

Threat Model a RAG Enterprise Knowledge Assistant

Focus:

- RAG
- Retrieval
- Trust Boundaries
- Prompt Injection

Files:

- capstone-01-rag-chatbot.md
- capstone-01-answer-key.md

---

## Capstone #2

Threat Model a Multi-Agent Procurement Assistant

Focus:

- Multi-Agent Systems
- Delegation
- Shared Memory
- MCP Security

Files:

- capstone-02-multi-agent-procurement-assistant.md
- capstone-02-answer-key.md

---

## Capstone #3

Threat Model an Autonomous Change Management Agent

Focus:

- Autonomy
- Reflection
- Governance
- Infrastructure Risk

Files:

- capstone-03-autonomous-change-management-agent.md
- capstone-03-answer-key.md

---

# Worksheets

## Trust Boundary Worksheet

Identify:

- Boundaries
- Threats
- Controls

---

## ATLAS Kill Chain Worksheet

Map:

Recon
→ Access
→ Execution
→ Persistence
→ Exfiltration
→ Impact

---

## Agent Risk Register

Capture:

- Risk
- Owner
- Control
- Residual Risk

---

## Threat Model Template

Used during capstones and workshops.

---

# Reference Materials

## AI Threat Modeling Cheat Sheet

One-page quick-reference document covering:

- OWASP (LLM + Agentic)
- ATLAS
- STRIDE
- Trust Boundaries
- Memory
- MCP
- Red Teaming

---

## Recommended Future References

- STRIDE / OWASP / ATLAS Crosswalk
- Facilitator Quick Guide
- Threat Modeling Playbook

---

# Presentation Decks

## Generator

Script:

scripts/build_decks.py

Renders every lesson's markdown into branded 16:9 PowerPoint decks (python-pptx), reusing the palette from index.html. Output lands in decks/.

Outputs:

- One deck per lesson (19 files; lesson 12C included)
- course-overview.pptx — curriculum & learning-loop overview
- course-complete.pptx — the full course in order
- assessments.pptx — capstones + certification questions

Every slide carries speaker notes (plain-text narration for voiceover/TTS).

Run (inside the ai-threatmodeler container; needs python-pptx, in requirements.txt):

docker exec ai-threatmodeler python3 /opt/ai-tm/training/scripts/build_decks.py

Optional flags: --only lessons|overview|combined|assessments, --out PATH.

Mermaid diagrams in diagrams/ must be rendered to lessons/images/ first via render-diagrams.sh.

Roadmap (planned next phase): lock decks, then produce per-module video/SCORM 1.2 packages by capturing slides (existing headless Chromium), narrating from the speaker notes (TTS or recorded), and assembling with ffmpeg.

---

# Trainer Guide

Recommended Delivery Formats

## 90 Minutes

- Primer
- Trust Boundaries
- RAG
- Capstone #1

---

## Half Day

- Foundations
- RAG
- Single Agent
- Capstone #1

---

## Full Day

- Foundations
- RAG
- Single Agent
- Memory Security
- Multi-Agent
- Autonomous Agent
- MCP Security
- Capstones

---

# Core Principles

Principle 1

Data is not instructions.

Principle 2

Tools are authority.

Principle 3

Memory creates persistence.

Principle 4

Policies belong outside models.

Principle 5

Trust boundaries deserve scrutiny.

Principle 6

Threat