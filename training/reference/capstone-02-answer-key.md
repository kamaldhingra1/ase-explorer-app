# Capstone #2 Instructor Guide
# Multi-Agent Procurement Assistant

This document provides exemplar answers.

Learners may identify additional valid attack chains, threats, controls, and risk ratings.

Grade based on reasoning quality, evidence, and completeness.

---

# Architecture Overview

The system contains:

- Multiple collaborating agents
- Shared memory
- Tool execution
- MCP integration
- ERP connectivity
- Human approvals

This introduces substantially more risk than RAG because:

- Authority exists
- Delegation exists
- Shared state exists
- Real-world actions exist

The architecture combines:

- Multi-Agent Risks
- Memory Risks
- MCP Risks
- Excessive Agency Risks

---

# Part 1 – Component Inventory

Expected Components

| AI-ID | Component |
|---------|---------|
| AI-01 | Employee |
| AI-02 | Request Agent |
| AI-03 | Coordinator Agent |
| AI-04 | Vendor Agent |
| AI-05 | Budget Agent |
| AI-06 | Approval Agent |
| AI-07 | Purchase Agent |
| AI-08 | Shared Memory |
| AI-09 | Conversation History |
| AI-10 | Policy Engine |
| AI-11 | Audit Service |
| AI-12 | Tool Broker |
| AI-13 | MCP Server |
| AI-14 | ERP System |
| AI-15 | Email System |
| AI-16 | HITL Approval Gateway |

Minimum expected:

12+

Full credit:

15+

---

# Part 2 – Data Flows

Expected Major Flows

| DF-ID | Flow |
|---------|---------|
| DF-01 | Employee → Request Agent |
| DF-02 | Request Agent → Coordinator |
| DF-03 | Coordinator → Vendor Agent |
| DF-04 | Coordinator → Budget Agent |
| DF-05 | Coordinator → Approval Agent |
| DF-06 | Coordinator → 

flowchart TB

Employee --> RequestAgent

RequestAgent --> Coordinator

Coordinator --> VendorAgent
Coordinator --> BudgetAgent
Coordinator --> ApprovalAgent
Coordinator --> PurchaseAgent

VendorAgent --> Memory
BudgetAgent --> Memory
ApprovalAgent --> Memory
PurchaseAgent --> Memory

PurchaseAgent --> PolicyEngine

PolicyEngine --> ToolBroker

ToolBroker --> MCP

MCP --> ERP
MCP --> Email

ApprovalAgent --> HITL

ToolBroker --> Audit


flowchart LR

User --> Agent

subgraph Internal
Agent --> SharedMemory
Agent --> ToolBroker
Agent --> PolicyEngine
end

ToolBroker --> MCP

MCP --> ERP
MCP --> Email

Agent --> HITL

style SharedMemory fill:#fff2cc
style ToolBroker fill:#ffd9d9
style MCP fill:#ffd9d9
style ERP fill:#d9ebff


flowchart LR

PromptInjection
--> DelegationAbuse

DelegationAbuse
--> MemoryPoisoning

MemoryPoisoning
--> ToolAbuse

ToolAbuse
--> ERPAction

ERPAction
--> BusinessImpact


flowchart LR

PromptInjection
--> PolicyEngine

PolicyEngine
--> MemoryValidation

MemoryValidation
--> ToolBroker

ToolBroker
--> HITL

HITL
--> ERP