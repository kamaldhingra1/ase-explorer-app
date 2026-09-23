---
title: AI-Augmented STRIDE
module: Foundations
minutes: 50
level: Intermediate
status: complete
---

# AI-Augmented STRIDE

> Before OWASP and ATLAS, there was **STRIDE** — the classic six-category threat app (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege). It still works — as long as you **augment it** for the AI-era failure modes that don't fit the original six. 
>This lesson builds your mental bridge from classic security to AI threat modeling, and gives you the worksheet you'll reuse in every deep-dive.

## Why this matters

**STRIDE** is the "why" behind both OWASP and ATLAS: it forces you to ask *six* questions of *every* component and flow, instead of pattern-matching to a known list. When AI-specific frameworks miss something in *your* architecture, STRIDE is your safety net. And many people you'll work with know STRIDE already — AI-augmented STRIDE is how you translate for them.

## The six, plus the AI augmentations

| Letter | Threat | Classic question | AI augmentation |
|--------|--------|------------------|-----------------|
| **S** | Spoofing | Can you pretend to be someone/something else? | Forge a *human* or *system identity* in conversation; impersonate a tool or a trusted datastore via prompt impersonation; "model-spoofing" — a poisoned model posing as the legit one |
| **T** | Tampering | Can data be modified in transit or at rest? | Modify *conversation memory* or *retrieved context* (indirect injection); tamper with the prompt template store; corrupt the vector index |
| **R** | Repudiation | Can someone deny doing something? | **Non-deterministic outputs**: who's accountable for a model's action? A user can claim "the agent did it"; a poisoned model erases the responsibility trail |
| **I** | Info Disclosure | Can secrets leak? | Model output leaks training data/PII/memory (AML.T0024); system prompt/chain-of-thought leakage; **prompts cross the `INTERNAL → EXTERNAL` boundary** (DF-07 in RAG) |
| **D** | Denial of Service | Can the service be made unusable? | Context-window flooding; token/cost exhaustion; runaway agent loops; **retrieval storms** that hammer the vector DB |
| **E** | Elevation of Privilege | Can you gain more rights than intended? | **Excessive agency** — the model gains (and uses) tool permissions it should never touch; delegation-chain escalation in multi-agent systems |

## The three AI-specific threat kinds STRIDE doesn't fit

Put these in a dedicated column on your worksheet — they're the *new* categories:

> **1. Prompt injection** (the "control hijack"): attacker text becomes instructions. Closest STRIDE bucket is **Tampering** (it modifies what the model "runs") but it deserves its own flag so you never bury it.

> **2. Poisoning** (corrupting trust at rest): training, fine-tuning, or **RAG indexing** data adversarially edited. A *persistence* problem — closest to Tampering + Spoofing (the store now lies persuasively).

> **3. Model theft / extraction** (`AML.T0025`): stealing behavior or weights through legitimate queries — classical *Intellectual Property / infodisclosure* that attacks *the model itself*, not its surroundings.

> **4. Hallucination / overreliance**: *nobody* attacks — the system simply fails persuasively. It's not classic "Info Disclosure" or "Tampering"; it's **integrity of the output contract**: downstream systems and humans that can't tell fact from invention. Track it as its own row: **Misinformation & Overreliance**.

> [!exercise] **The mnemonic for the augmented sheet**
> STRIDE + **P**oisoning, **I**njection, **M**isinformation, **T**heft = **STRIDE-PIMT**. Write the four extras as their own section so the classic six don't swallow them.

## The worksheet (your reusable template)

For **every** component and **every** boundary-crossing flow, fill one line:

```
Component/Flow:    AI-??
Trust zone:        UNTRUSTED | EDGE | INTERNAL | EXTERNAL
STRIDE hits:       S T R I D E            (mark each that applies)
AI extras:         Injection  Poisoning  Misinfo  Theft
Primary OWASP:     LLM0?
Primary ATLAS:     AML.T…?
Most damaging path: <diagram arrows>
One control that kills it: <specific, architectural>
Risk now / after:  High-Moderate-Low → ……
```

Work through the worksheet once per pattern and your reports stop being a mystery — they become a *grid you already filled in*.

> [!risk] **What can go wrong?** Run the six letters against every AI system and the same highlights recur:
> - **Spoofing:** a forged human/system identity in a conversation gets privileged treatment; a poisoned model impersonates the legitimate one.
> - **Tampering:** conversation memory, retrieved context, or prompt templates are modified — invisible until the wrong answer acts.
> - **Repudiation:** with non-deterministic output, *who decided?* A user can claim "the agent did it"; a poisoned chain erases the trail.
> - **Info disclosure:** system prompts, chain-of-thought, training data, or PII exit through normal-looking output.
> - **DoS:** context-window flooding, token burn, runaway agent loops, retrieval storms.
> - **Elevation:** excessive agency — the model reaches tools and permissions it was never meant to touch.
> - **Plus P-I-M-T:** poisoning, injection, misinformation (overreliance), and model theft — the four that predate the classic six.

> [!fix] **What can we do about it?** Each letter has a natural enforcement point you can name without a Ph.D.:
> - S: strong identity + provenance for messages and model artifacts (signed prompts, verified store content).
> - T: write-tamper-evident memory/stores; validate before it re-enters the context; immutable template/config.
> - R: signed, append-only logs of model calls and actions; deterministic human approval records.
> - I: minimize what reaches context; redact at boundaries; negotiate no-training with providers; monitor for odd extraction patterns.
> - D: budgets, timeouts, loop breakers, retrieval limits — enforced by the runtime, not the prompt.
> - E: least-privilege tools, scoped autonomy, HITL gates on consequential actions.
> - PIMT: provenance + validation at ingestion (P), treat every input as instructions (I), verify against sources before action (M), rate/limit inference (T).

## In the tool

1. Run **RAG GenAI**. For finding `LLM01 · AML.T0051.005 (indirect injection)`, map it onto the worksheet: which component (`AI-07 Retriever` vs `AI-08 LLM`)? Which STRIDE letter? Which AI-extra?
2. Notice how **R**, **E**, and the **Misinfo** row appear differently across patterns: single-agent vs autonomous-agent reports. STRIDE ranks the *where*.

## Hands-on exercise

> [!exercise] **Fill the sheet blind, then diff**
> 1. Take the **Autonomous Agent** diagram and the `UNTRUSTED/EDGE/INTERNAL/EXTERNAL` zones. Fill the STRIDE-PIMT worksheet for **four** components you pick (don't peek at the report yet).
> 2. For each mark you made, write one achievable attacker sentence ("A user sends `…` so that agent `…`").
> 3. Run the sample, open the threat section, and **diff**: which of your sheet rows does the report confirm, which does it disagree with, and which did you miss? For each disagreement, decide who's right — the tool or you — citing the flow/component evidence.

## Checkpoints

1. Which STRIDE letters does *indirect prompt injection* exercise, and why?
2. Why is *repudiation* particularly thorny in AI (non-determinism)? Give the scenario.
3. Name the four PIMT categories and one real example each.
4. When does a threat belong in **E** (elevation/excessive agency) instead of **T** (tampering)? Boundary: *modifying data* vs *using power*.

## Quick check

> [!quiz]
> 1. Which STRIDE letter does indirect prompt injection exercise most closely?
> - A) S — Spoofing
> - B) T — Tampering
> - C) R — Repudiation
> - D) E — Elevation of Privilege
> Answer: B
> 2. Which PIMT category matches "nobody attacks — the system simply fails persuasively"?
> - A) Poisoning
> - B) Injection
> - C) Misinformation / overreliance
> - D) Theft
> Answer: C
> 3. When does a threat belong in E (Elevation) instead of T (Tampering)?
> - A) When it modifies data in transit
> - B) When it uses power the system grants beyond intent, rather than modifying data
> - C) When it is a denial-of-service
> - D) Never — T always wins
> Answer: B

## Key takeaways

- STRIDE remains the core six-question app; AI adds PIMT: Poisoning, Injection, Misinformation, Theft.
- Mark threats on *components + boundary flows*, not at the system level.
- Non-determinism breaks clean accountability — plan for it in mitigations and governance.
- The worksheet is your bridge: it maps directly onto the OWASP/ATLAS rows the tool reports.

## Where to next

You can now name the threat on any component and flow. The last foundation skill is the payoff: **Lesson 08 — Mitigations & Controls for AI**.