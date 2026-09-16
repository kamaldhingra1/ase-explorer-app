---
title: Governance & Handoff
module: Wrap-Up
minutes: 30
level: Intermediate
status: complete
---

# Governance & Handoff

> A threat model is only worth what happens *after* it. The handbook ends where the program begins: turning findings into owned remediation, mapping risks onto the frameworks regulators will cite, knowing how to respond when one of these threats actually fires, and keeping the model honest as the system changes. This lesson turns your best report into a governance artifact.

## Why this matters

AI threat models get reviewed by more than engineers. They are evidence in front of **regulators** (EU AI Act), **risk and compliance teams** (NIST AI RMF), and **domain authorities** (FDA/GxP in medical, SOC 2/ISO for vendors). A finding without an owner is a gap in that evidence. A system changing faster than its threat model is a model that has quietly expired.

Governance is the discipline that keeps the loop of Lesson 02's "Did we do a good job?" honest at the scale where one person can't.

## From findings to action

The handoff has four mechanical outputs — if any is missing, the handoff is incomplete:

1. **Remediation roadmap** — findings grouped by risk and dependency (fix the *enablement* first: the tool that lets everything else fire).
2. **Owners** — one named person per finding, not a team distribution list. Owners can delegate; the paper trail cannot.
3. **SLAs / deadlines** — critical ≤ days, high ≤ one sprint, medium ≤ a few weeks; each with a review date, not just a due date.
4. **Residual-risk sign-off** — risks accepted *consciously* need a named approver and a re-review date. An accepted risk is a decision; an unaccepted one is simply unhandled.

## Compliance orientation

The generated risk categories map onto the frameworks your reviewers will cite. Teach yourself the three most common crosswalks:

| Framework | What it wants to see | Where your findings land |
|-----------|----------------------|--------------------------|
| **EU AI Act** | Risk classification of the system, transparency, human oversight, logging | Oversight/HITL findings map to human-oversight duties; model "secrets & scope" rows map to transparency+logging |
| **NIST AI RMF** | Govern, Map, Measure, Manage | Your report *is* a MAP + MEASURE artifact; remediation plans are the MANAGE layer |
| **Medical (FDA/GxP)** | Validation, traceability, change control | Evidence chains (`AI-NN`/`DF-NN`) become validation traceability; re-run-on-change is change control |

A practical habit: for every report you produce, write the two-line mapping to each framework your organization already reports on. If you can't, escalate the crosswalk to the compliance owner — don't invent it.

## AI-specific incident response

When a threat in the catalog *fires*, the response has AI-specific wrinkles beyond a normal incident:

- **Proving repudiation (who said what):** model decisions must be reconstructable. Signed, append-only logs of prompts, retrieved context, tool calls, and outputs — *append-only* so no one (human or agent) can quietly rewrite history. If your agent's reflection or memory is mutable, the log is your only ground truth. (Lesson 12's influence shows up directly here.)
- **Model rollback:** point inference at the last known-good model version. Have the rollback path rehearsed before it's needed — same discipline as a database restore.
- **Retrieval-store reingestion:** when the attack was *index poisoning*, the fix is not a new prompt; it's purging and re-ingesting the knowledge base with validation. The `DF-11` ingest path from the RAG catalog is the target.

## Model registry & change control

Keep an inventory your threat model can diff against:

- **Model card per model** — provider, version, data it touched, risk profile, who approved it.
- **Change triggers** — any model, tool, flow, or zone addition means: re-run the threat model and diff the report. An added agent with a new tool is a *new* finding waiting to happen.

> [!risk] **What can go wrong?** When governance collapses:
> - Findings get an owner but no SLA; the threat outlives every sprint — **unowned remediation**.
> - An accepted risk was never *accepted*, just ignored; the audit finds it later with interest — **implicit acceptance**.
> - The model is "up to date" but the system shipped three agents since it was run — **expired evidence**.
> - An incident has no append-only record of what the agent was told; the "why did it do that" debate runs on he-said-she-said — **no repudiation trail**.
> - Rollback hasn't been rehearsed; the first drill happens mid-incident.

> [!fix] **What can we do about it?** The mechanics that keep governance real:
> - **One owner, one SLA, one review date per finding** on the roadmap — non-negotiable handoff list.
> - **Sign-off ceremony for residual risk:** named approver, dated, re-reviewed. Decisions get paper; silence doesn't.
> - **Pin re-runs to change:** a checklist gate ("has the threat model been re-run since the last change?") at every deployment of an AI system.
> - **Append-only, signed logging** for prompts/context/tool calls/outputs — rehearsal-tested rollback and reingestion runbooks.

## In the tool

1. Take one completed sample report (e.g., RAG or Multi-Agent) as your working artifact.
2. Fill the handoff worksheet from the exercise below: roadmap, owners, SLAs, residual-risk sign-off.
3. Write the two-line compliance crosswalk (EU AI Act / NIST AI RMF) for the top two findings. If any finding has no natural mapping, that *is* the red flag to escalate.

## Hands-on exercise

> [!exercise] **Draft the governance handoff**
> 1. **Rank and roadmap:** from your chosen report, order the top 5 findings by risk, then dependency (what enables what). First line item is the highest-risk, most-enabling fix.
> 2. **Own it:** assign a fake-but-plausible owner role to each and an SLA (critical ≤ days, high ≤ sprint, medium ≤ 2 wk).
> 3. **Accept consciously:** pick the one finding you would *accept* as residual risk if you had to ship. Write the one-paragraph acceptance: impact, likelihood, compensating control, approver, re-review date. State explicitly why it is not "unhandled".
> 4. **Incident dry-run:** for the indirect-injection row, sketch the response: what the append-only log must capture, the model rollback path, and (for RAG) the purging/reingestion plan.
> 5. **The change gate:** your system adds a new tool next week. Write the one-sentence policy that forces a threat-model re-run and report diff before it ships.

## Checkpoints

1. What are the four outputs of a complete handoff?
2. Why is "accepted but not decided" worse than "accepted"? What turns acceptance into a decision?
3. Where do your findings map in EU AI Act vs NIST AI RMF — and why does it matter to say it out loud?
4. Why must the interaction log be append-only and signed? Which earlier lesson's machinery does it protect?
5. Name the three AI-specific incident-response steps — and which catalog attack each one answers.

## Quick check

> [!quiz]
> 1. Which crosswalk connects your report's findings to purchasing or EU rules?
> - A) Findings → NIST AI RMF
> - B) Oversight / HITL controls → EU AI Act human oversight obligations
> - C) Tool IDs → FDA only
> - D) None — reports and rules never meet
> Answer: B
> 2. AI incident response fundamentally needs:
> - A) append-only, tamper-evident logs and a tested rollback path
> - B) a faster model
> - C) more prompt engineering
> - D) archived chat messages only
> Answer: A
> 3. A risk that was never formally decided on is:
> - A) accepted
> - B) unhandled — the worst state to hand off
> - C) mitigated
> - D) avoided
> Answer: B

## Key takeaways

- The report is a decision, not a document: owner + SLA + date per finding, and named approval for what you don't fix.
- Your threat model doubles as compliance evidence (EU AI Act / NIST AI RMF / domain frameworks) — the crosswalk belongs in it.
- AI incidents hinge on repudiation: signed, append-only logs, rehearsed rollback, and validated reingestion.
- The model is a living artifact: any system change triggers a re-run and a diff, or the model has expired.

## Where to next

That completes the wrap-up. From the top again, the full arc: **Models & frameworks (01–08) → Pattern deep dives (09–12) → Accountability (13–14)**. You now have the vocabulary to threat-model an AI system, a library of catalogs to answer-key it, and the discipline to hand the work to someone who owns it.