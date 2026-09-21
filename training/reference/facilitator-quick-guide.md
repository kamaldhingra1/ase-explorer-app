# Facilitator Quick Guide

## Purpose

This guide helps instructors:

- Evaluate student work
- Grade capstones
- Lead discussions
- Recognize common mistakes

---

# What Good Looks Like

A strong threat model includes:

✅ Components

✅ Data Flows

✅ Trust Boundaries

✅ Threats

✅ Mitigations

✅ Validation Strategy

Weak models jump directly to findings.

---

# Expected Risk Priorities

## RAG

Highest Risks:

1. Indirect Prompt Injection
2. Index Poisoning
3. Sensitive Data Disclosure
4. Prompt Leakage

---

## Single Agent

Highest Risks:

1. Tool Abuse
2. Excessive Agency
3. Privilege Escalation

---

## Multi-Agent

Highest Risks:

1. Delegation Abuse
2. Agent Collusion
3. Shared Memory Poisoning

---

## Autonomous

Highest Risks:

1. Goal Drift
2. Autonomous Escalation
3. Observation Poisoning
4. Kill-Switch Failure

---

# Common Student Mistakes

## Mistake 1

Only analyzing the model.

Correction:

Analyze flows and boundaries.

---

## Mistake 2

Ignoring persistence.

Correction:

Ask:

"What survives the session?"

---

## Mistake 3

Missing tool authority.

Correction:

Ask:

"What can actually act?"

---

## Mistake 4

Ignoring governance.

Correction:

Ask:

"Who is accountable?"

---

# Fast Grading

## Trust Boundaries

Did the learner identify:

- Human Boundary
- Memory Boundary
- Tool Boundary
- Provider Boundary

If yes:

Pass

---

## Threat Identification

Did the learner identify:

- Injection
- Disclosure
- Persistence
- Excessive Agency

If yes:

Pass

---

## Mitigations

Look for:

- Least Privilege
- Validation
- Isolation
- Monitoring

---

# Discussion Prompts

What creates persistence?

What creates business impact?

What creates blast radius?

What control would you fund first?

What control would you remove last?

---

# Final Rule

Threat models are judged by reasoning quality.

Not by exact wording.