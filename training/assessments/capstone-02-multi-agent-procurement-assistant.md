# Capstone Exercise #2
# Threat Model a Multi-Agent Procurement Assistant

Difficulty: Advanced

Recommended Time: 60–90 Minutes

Applicable Lessons

- 01 Primer
- 02 Four Questions
- 03 Trust Zones
- 03A AI Trust Boundaries
- 04 Components & Attack Surface
- 05 OWASP LLM Top 10
- 06 MITRE ATLAS
- 06A AI Attack Chains
- 07 AI-Augmented STRIDE
- 08 Mitigations
- 10 Single Agent
- 10A Agent Memory Security
- 11 Multi-Agent
- 12A MCP & Tool Security
- 12B AI Red Teaming

---

# Scenario

Your organization plans to deploy an AI-driven procurement assistant.

Employees submit purchasing requests through a chat interface.

The system is composed of multiple collaborating agents.

Each agent performs a specialized role.

The purchasing process currently requires:

- Vendor lookup
- Budget validation
- Approval workflow
- Purchase order creation
- ERP submission
- Notification

The organization wants to partially automate these activities.

---

# Architecture

Employee
↓
Request Agent

Request Agent
↓
Coordinator Agent

Coordinator Agent
↓
Vendor Agent

Coordinator Agent
↓
Budget Agent

Coordinator Agent
↓
Approval Agent

Coordinator Agent
↓
Purchase Agent

Purchase Agent
↓
Tool Broker

Tool Broker
↓
MCP Server

MCP Server
↓
ERP System

MCP Server
↓
Email System

All agents have access to:

Shared Memory

Conversation History

Policy Engine

Audit Service

Human Approval Gateway

---

# Objectives

Perform a complete threat model.

Identify:

- Components
- Data Flows
- Trust Boundaries
- Attack Chains
- Agent-Specific Risks
- Memory Risks
- MCP Risks
- Recommended Controls

---

# Part 1 – Component Inventory

Create:

| AI-ID | Component | Role | Trust Zone |
|---------|---------|---------|---------|

Minimum:

15 components

Consider:

- Agents
- Memory
- Tool Broker
- MCP Server
- ERP
- Audit Service
- Policy Engine

---

# Part 2 – Data Flows

Create:

| DF-ID | Source | Destination | Purpose |
|---------|---------|---------|---------|

Minimum:

15 flows

Consider:

- Agent-to-Agent
- Agent-to-Memory
- Agent-to-Tool
- Tool-to-ERP
- Agent-to-HITL

---

# Part 3 – Trust Boundaries

Create:

| TB-ID | Boundary | Why It Exists |
|---------|---------|---------|

Minimum:

Human Boundary

Memory Boundary

Tool Boundary

Provider Boundary

Delegation Boundary

Approval Boundary

---

# Part 4 – OWASP Analysis

Identify:

At least 10 threats.

Map each to OWASP.

Examples:

- Prompt Injection
- Excessive Agency
- Data Poisoning
- Information Disclosure
- Improper Output Handling

---

# Part 5 – MITRE ATLAS

Map each major threat.

Examples:

AML.T0051

AML.T0054

AML.T0020

AML.T0024

AML.T0010

AML.T0043

---

# Part 6 – STRIDE Analysis

Provide:

At least one example for:

- Spoofing
- Tampering
- Repudiation
- Information Disclosure
- Denial of Service
- Elevation of Privilege

---

# Part 7 – Agent Collaboration Risks

Identify risks unique to Multi-Agent systems.

Minimum:

Five findings.

Examples:

- Agent Collusion
- Delegation Abuse
- Agent Impersonation
- Shared-State Manipulation
- Goal Drift Amplification

---

# Part 8 – Memory Security

Analyze:

Shared Memory

Create:

| Threat | Impact | Mitigation |
|---------|---------|---------|

Minimum:

Five threats.

Examples:

- Memory Poisoning
- Cross-Agent Influence
- Replay
- False Fact Persistence
- Privilege Persistence

---

# Part 9 – MCP & Tool Security

Analyze:

Tool Broker

MCP Server

ERP Integration

Email Integration

Minimum:

Five findings.

Examples:

- Tool Abuse
- Credential Misuse
- Excessive Permissions
- Action Chaining
- Capability Escalation

---

# Part 10 – Attack Chain

Build a realistic attack chain.

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

# Part 11 – Highest-Risk Findings

Rank the top ten risks.

Use:

| Risk | Likelihood | Impact | Rating |
|---------|---------|---------|---------|

---

# Part 12 – Mitigations

Create:

| Threat | Control | Component |
|---------|---------|---------|

Minimum:

10 mitigations.

Include:

- Preventive
- Detective
- Corrective

controls.

---

# Part 13 – Red Team Exercise Plan

Design:

2 Prompt Injection Tests

2 Agent Delegation Tests

1 Memory Poisoning Test

1 Tool Abuse Test

1 MCP Abuse Test

1 Approval Bypass Test

For each:

- Attack
- Expected Result
- Success Criteria

---

# Deliverable

Produce:

Executive Summary

Architecture Summary

Component Inventory

Trust Boundaries

Threat Analysis

Attack Chain

Risk Register

Mitigations

Residual Risks

Validation Plan

---

# Scoring Rubric

Component Inventory: 10%

Data Flows: 10%

Trust Boundaries: 10%

OWASP Analysis: 10%

ATLAS Mapping: 10%

STRIDE Analysis: 10%

Agent Risks: 10%

Memory Risks: 10%

Mitigations: 10%

Red-Team Plan: 10%

Total: 100%

---

# Expert Challenge

Map every finding simultaneously to:

OWASP

ATLAS

STRIDE

Trust Boundary

Component

Then identify:

1. Highest-Risk Trust Boundary
2. Highest-Risk Agent
3. Highest-Risk Memory Flow
4. Highest-Risk Tool Flow
5. Best Single Control

Justify all answers.