# Capstone Exercise #3
# Threat Model an Autonomous Change Management Agent

Difficulty: Expert

Recommended Time: 90-120 Minutes

Applicable Lessons

- 01 Threat Modeling Primer
- 02 Four Questions
- 03 Trust Zones & Data Flows
- 03A AI Trust Boundaries
- 04 AI Components & Attack Surface
- 05 OWASP LLM Top 10
- 06 MITRE ATLAS
- 06A AI Attack Chains & Kill Chains
- 07 AI-Augmented STRIDE
- 08 Mitigations & Controls
- 09 RAG GenAI
- 10 Single Agent
- 10A Agent Memory Security
- 11 Multi-Agent
- 12 Autonomous Agent
- 12A MCP & Tool Ecosystem Security
- 12B AI Red Teaming & Adversarial Validation
- 13 Writing the Threat Report
- 14 Governance & Handoff

---

# Scenario

Your organization plans to deploy a highly autonomous Change Management Agent.

The goal:

Receive change requests and autonomously:

- Analyze proposed changes
- Retrieve documentation
- Build change plans
- Open tickets
- Execute testing
- Schedule deployments
- Roll back failed deployments
- Notify stakeholders
- Create audit records

The organization wants minimal human involvement.

Human approval is required only for high-risk production changes.

The agent has access to:

- ITSM Platform
- CI/CD Pipeline
- Source Code Repositories
- Infrastructure Management APIs
- ERP Asset Records
- Email
- Teams
- Change Knowledge Base

The system operates continuously.

---

# Architecture

User
↓
Gateway

Gateway
↓
Goal Manager

Goal Manager
↓
Autonomous Agent Core

Agent Core
↓
Planning Engine

Planning Engine
↓
LLM Provider

Agent Core
↓
Long-Term Memory

Agent Core
↓
RAG Retrieval Layer

Agent Core
↓
Policy Engine

Policy Engine
↓
Tool Broker

Tool Broker
↓
MCP Servers

MCP Servers
↓
ITSM

MCP Servers
↓
CI/CD

MCP Servers
↓
Infrastructure APIs

MCP Servers
↓
Email

MCP Servers
↓
Teams

Agent Core
↓
Boundary Detection

Boundary Detection
↓
Human Approval Gateway

Behavior Monitor
↓
Audit Service

Kill Switch
↓
Agent Core

---

# Objectives

Perform a complete threat model.

Identify:

- Components
- Data Flows
- Trust Boundaries
- Autonomous Risks
- Memory Risks
- MCP Risks
- Governance Risks
- Validation Strategy

---

# Part 1 – Component Inventory

Create:

| AI-ID | Component | Purpose | Trust Zone |
|---------|---------|---------|---------|

Minimum:

20 components

Required:

Goal Manager

Planning Engine

Memory

Policy Engine

Boundary Detection

Behavior Monitor

Kill Switch

Tool Broker

MCP Server

---

# Part 2 – Data Flows

Create:

| DF-ID | Source | Destination | Purpose |
|---------|---------|---------|---------|

Minimum:

20 flows

Required:

Planning Flows

Execution Flows

Memory Flows

Approval Flows

Monitoring Flows

---

# Part 3 – Trust Boundaries

Create:

| TB-ID | Boundary | Why It Exists |
|---------|---------|---------|

Required:

Human Boundary

Provider Boundary

Memory Boundary

Tool Boundary

Approval Boundary

Infrastructure Boundary

Monitoring Boundary

Kill-Switch Boundary

---

# Part 4 – OWASP Analysis

Identify:

Minimum 12 threats

Expected categories:

- Prompt Injection
- Sensitive Information Disclosure
- Supply Chain
- Data Poisoning
- Improper Output Handling
- Excessive Agency
- Prompt Leakage
- Vector Weaknesses
- Misinformation
- Unbounded Consumption

---

# Part 5 – MITRE ATLAS Analysis

Map findings to:

AML.T0051

AML.T0054

AML.T0020

AML.T0024

AML.T0025

AML.T0043

AML.T0010

Additional mappings encouraged.

---

# Part 6 – STRIDE Analysis

Map findings to:

- Spoofing
- Tampering
- Repudiation
- Information Disclosure
- Denial of Service
- Elevation of Privilege

Minimum:

Two examples per category.

---

# Part 7 – Autonomous Agent Risks

Identify:

At least ten findings.

Examples:

- Goal Drift
- Observation Poisoning
- Autonomous Escalation
- Recursive Reflection Abuse
- Kill Switch Bypass
- Guardrail Circumvention
- Scope Expansion
- Boundary Evasion
- Runaway Planning
- Tool Chaining

---

# Part 8 – Memory Security

Analyze:

Short-Term Memory

Long-Term Memory

Shared Knowledge

Create:

| Threat | Impact | Mitigation |
|---------|---------|---------|

Minimum:

Seven findings.

---

# Part 9 – MCP & Tool Security

Analyze:

Tool Broker

MCP Servers

CI/CD Integration

Infrastructure APIs

Email

Teams

Minimum:

Seven findings.

---

# Part 10 – Governance Review

Identify:

- Regulatory Risks
- Audit Risks
- Human Oversight Requirements
- Accountability Concerns
- Incident Response Requirements

Minimum:

Five findings.

---

# Part 11 – Attack Chain

Create an attack chain.

Template:

Reconnaissance:
____________________

Initial Access:
____________________

Execution:
____________________

Persistence:
____________________

Exfiltration:
____________________

Impact:
____________________

---

# Part 12 – Top 10 Risks

Rank:

| Risk | Likelihood | Impact | Rating |
|---------|---------|---------|---------|

Provide rationale.

---

# Part 13 – Mitigation Strategy

Create:

| Threat | Mitigation | Location |
|---------|---------|---------|

Minimum:

15 controls

Include:

Preventive

Detective

Corrective

Compensating

---

# Part 14 – Red Team Plan

Design:

- Prompt Injection Test
- Observation Poisoning Test
- Memory Poisoning Test
- Tool Abuse Test
- MCP Abuse Test
- Goal Drift Test
- Reflection Abuse Test
- Approval Bypass Test
- Kill Switch Test
- Data Exfiltration Test

Define:

Attack

Expected Result

Success Criteria

---

# Deliverable

Produce:

Executive Summary

Architecture Summary

Risk Register

Threat Model

Control Strategy

Residual Risk Assessment

Validation Plan

Governance Recommendation

Deployment Recommendation

---

# Scoring Rubric

Component Inventory: 10%

Data Flows: 10%

