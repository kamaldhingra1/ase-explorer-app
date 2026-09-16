---
title: Writing the Threat Report
module: Wrap-Up
minutes: 35
level: Beginner
status: complete
---

# Writing the Threat Report

> The threat model produces a report. The *course* up to now has been about making sure that report is right. This lesson is about making sure it is **read** — by engineers who need evidence and by leaders who need decisions. A finding you can't trace to a component or a flow is a rumor; a risk you can't assign an owner to is a wish.

## Why this matters

A threat report has two audiences that speak different languages:

- **Engineers** ask *where* and *how*: which component, which flow, what exactly is reachable.
- **Leaders** ask *so what*: how likely, how bad, who owns it, when is it fixed.

A single finding must answer both — or it gets filed, forgotten, and the vulnerability ships. The generated report is a *draft deliverable*, not the deliverable. Your job is to make each finding defensible and each rating honest.

## Anatomy of the generated report

A full risk assessment produces several shelves of content. You only need three for a handoff:

| Shelf | What's in it | Who consumes it |
|-------|-------------|-----------------|
| **Model** | Component inventory (`AI-NN`), data flows (`DF-NN`), trust boundaries (`TB-NN`) | Engineers (and the threat model itself) |
| **Findings** | Pre-mapped threat catalog rows + generated threats, each traced to components/flows | Engineers reviewing; leadership skims |
| **Risk & mitigations** | Per-finding rating, mitigation, owner space | Owners and approvers |

The report's power is that every finding is *indexed*: it names the `AI-NN`/`DF-NN`/`TB-NN` it came from. That index is your evidence.

## Evidence: tracing every claim

A finding is a **claim** with an **evidence chain** and an **inference**. Keep them separate:

- **Claim:** "Indirect prompt injection via retrieval (`LLM01`, `AML.T0051.005`)."
- **Evidence (observed):** `DF-12` `UNTRUSTED → INTERNAL` allows user text into stored context; `DF-06` later feeds stored content into `DF-07`, which crosses `INTERNAL → EXTERNAL` to the LLM provider.
- **Inference (inferred):** therefore a crafted document can steer the provider's output.

If you can't point to the exact `DF-NN` and zone pair for a claim, the finding is either wrong or needs more modeling. During review, this is the single most useful habit: **every finding must name its evidence, or it doesn't ship.**

## Risk language: impact × likelihood → owner

The report rates risk (low/medium/high/critical). You add the *language* that makes ratings actionable:

1. **Impact** — what happens if it fires? (data loss, system takeover, cost, reputation). One sentence, concrete.
2. **Likelihood** — how reachable is it? (public-facing flow, authenticated internal flow, needs a privileged role).
3. **Rating** — the report's rating, sanity-checked against 1 and 2. If the report says *Low* but impact is "provider sees all PII", re-read the evidence before accepting it.
4. **Owner + deadline** — a named owner and a dated action. A finding without these is not a finding; it's a note.

A **full risk assessment** is what you get by re-running with all pattern catalogs enabled. It widens *coverage* (more rows surface) but not *quality* — the premium you add is the traceability and the owner.

## Reading a report critically

Scan for failure patterns before you hand anything over:

- **Vague evidence:** a finding named to a component that isn't on the path the finding claims. (The `DF-` trace is the test.)
- **Prompt-as-control:** a mitigation that says "instruction to the model not to…". Lesson 08's test applies: rewrite it somewhere architectural or it's not a control.
- **Cargo-cult ratings:** copy-pasted likelihood with no reachability argument. The zone pair always tells you the reachability story.
- **Unmapped additions:** your architecture added components/flows the sample catalog never saw. New paths → new rows or the report is silent exactly where you changed things.

> [!risk] **What can go wrong?** When a report lands badly:
> - A finding with no `DF-NN` trace reads as *opinion*; engineering debates it instead of fixing it.
> - A "Low" rating with PII impact gets triaged down and ships — **under-rating** is the expensive error.
> - "We'll fix in a later sprint" with no owner produces a backlog item that outlives the threat.
> - A critical row in a full assessment overwhelms readers into ignoring the whole report — **rating inflation** as a failure mode of its own.

> [!fix] **What can we do about it?** The writing discipline that makes reports land:
> - **One finding = one claim = one evidence chain.** Trace to `AI-NN`/`DF-NN`/`TB-NN` before you write the sentence.
> - **Rate with the zone pair:** the reachability argument lives in the trust zones, not in the tone.
> - **Own it:** every finding leaves the room with a named owner and a dated action — this is a checklist item, not a style choice.
> - **Version the model:** when the architecture changes, re-run and diff the report so unmapped additions get re-cataloged.

## In the tool

1. Generate a **full risk assessment** for one completed sample (RAG is the richest catalog).
2. Read the report in this order: **model shelves** (components/flows/boundaries) → **findings** → **risk & mitigations**. Resist reading findings first.
3. Pick the two highest-rated findings. For each, write the evidence chain (claim / observed / inferred). If you cannot fill in "observed", go re-run with a wider catalog or flag it.

## Hands-on exercise

> [!exercise] **Rewrite one finding for two audiences**
> 1. Choose the **indirect injection** finding from the RAG report (or your own favorite high-rated row).
> 2. **For an engineer (150 words):** the evidence chain — the exact `DF-`/zone pair, the component that must be patched, and why the catalog calls it the signature threat. Include the one `DF-` id they'll go look at.
> 3. **For a non-technical stakeholder (100 words):** impact and likelihood in plain terms — what could happen to customers/data, how reachable it is, what a fix looks like at a roadmap level, and the named owner + deadline.
> 4. **Swap check:** read your engineering version as if you were the engineer — could you find the code path? Read your leader version as a CIO — do you know what to approve?

## Checkpoints

1. What is the difference between the "model" shelf and the "findings" shelf in a report?
2. Write the evidence chain for any finding: claim / observed / inferred.
3. Why does the zone pair give you the reachability (likelihood) argument?
4. What makes a finding a *deliverable* instead of a note (owner, deadline, action)?
5. What are the two failure modes of ratings — and which one is more expensive?

## Quick check

> [!quiz]
> 1. Every finding must be traceable to:
> - A) an emotional impact statement
> - B) an evidence chain of AI-/DF-/TB- rows
> - C) a sprint roadmap
> - D) the framework edition number
> Answer: B
> 2. Which rating error is the expensive one that triages a real risk into next year?
> - A) Over-rating a minor risk
> - B) Under-rating a real one
> - C) Using a medium by default
> - D) Rating after controls
> Answer: B
> 3. A finding with no owner and no deadline is:
> - A) a note, not a finding
> - B) a draft mitigation
> - C) an accepted risk
> - D) a control
> Answer: A

## Key takeaways

- The report is a draft deliverable; you add traceability, honesty, and owners.
- Evidence = claim + observed (`AI-NN`/`DF-NN`/`TB-NN`) + inference. No evidence, no finding.
- Ratings earn credibility from reachability arguments, not adjectives.
- Two audiences, two languages: engineers get paths, leaders get decisions.

## Where to next

The last lesson takes the finished report and makes it somebody's job: **Lesson 14 — Governance & Handoff**.