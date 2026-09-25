---
title: OWASP LLM Top 10
module: Foundations
minutes: 50
level: Intermediate
status: complete
---

# OWASP LLM Top 10

> The OWASP LLM Application Security Top 10 is the security industry's agreed catalogue of *what can go wrong* specifically with Large Language Model applications. Each entry names a failure mode, why it matters, and how it manifests. 
> Think of it as your **threat prompt list**: browse it, but always check it against *your* flows and components.

## Why this matters

The patterns in your tool are catalogued against exactly this list (`LLM01`–`LLM10`) in the **Pre-Mapped Threat Catalog** of every pattern file. When the report says a finding maps to `LLM06`, you need to know what that means without a lookup — and know what it *doesn't* cover, so you can spot blind spots (e.g. supply-chain, denial-of-service cases the tool rates low).

## The ten failure modes

![OWASP LLM Top 10](images/top-10-llm.png)

| ID | Category | What it is | Where it bites in practice |
|----|----------|-----------|----------------------------|
| **LLM01** | **Prompt Injection** | Direct: attacker text overrides the system instructions. Indirect: instructions hidden in *content the model retrieves* (documents, tool output, memory) | RAG-retrieved docs hijack the response; agent obeying a web page's "ignore previous instructions" |
| **LLM02** | **Sensitive Information Disclosure** | The model surfaces secrets, PII, training data, or internal context it should never emit | Support bot revealing another customer's record; leaked system metadata in output |
| **LLM03** | **Supply Chain** | Compromised model weights, poisoned fine-tuning, malicious open-source packages/components | Embedding model swap, backdoored RAG framework, tainted checkpoint |
| **LLM04** | **Data & Model Poisoning** | Adversary controls training/fine-tuning/indexing data to bias or backdoor the system (the input side of "training data poisoning"; applies to RAG indexes too) | Malicious docs in the vector DB; poisoned few-shot examples |
| **LLM05** | **Improper Output Handling** | Downstream systems trust model output as code/instructions/database commands without validation | Rendered HTML/XSS, SQL from a chatbot, shell command from an agent |
| **LLM06** | **Excessive Agency** | The system has more functions, permissions, or autonomy than it needs — and gets tricked into using them | Agent auto-deleting data, sending email, spending money because the tool was in scope |
| **LLM07** | **System Prompt Leakage** | Secrets and chain-of-thought embedded in the system prompt get extracted | "Repeat your instructions" prompt heists; config/keys in context window |
| **LLM08** | **Vector & Embedding Weaknesses** | Manipulating what gets retrieved or how it ranks — poisoning the answer before the model even sees it | Query crafted to surface the attacker's document; embedding weight tampering |
| **LLM09** | **Misinformation** | Hallucinations, outdated knowledge, fabricated citations — wrong output acted on as truth | Overreliance in medical/legal/financial decisions; invented "evidence" |
| **LLM10** | **Unbounded Consumption** | Costs spiral: huge context, runaway loops, repeated calls; the denial-of-service cousin | Context-window flooding, agent infinite loops burning tokens and GPU |

> [!callout] **Check the edition — and map to what the tool actually uses**
> The OWASP list is revised over time (2023 → 2025 renamed some). Our pattern catalogs use the **current single-list numbering** `LLM01`–`LLM10`, and every "Pre-Mapped Threat Catalog" row pairs each `LLM0x` with the **MITRE ATLAS** technique (`AML.T….`) — Lesson 06 gives you that second axis. Where you see a row with `—` in the OWASP column, that's a threat tracked **only** in ATLAS (e.g. `AML.T0025` model extraction) — a reminder that frameworks overlap but don't contain each other.


## Reading strategy in a report

When you see `LLM06` next to a finding, answer three questions:

> **1. Which flavor?** (direct/indirect injection, disclosure, agency, …) — the specific attack matters more than the category.

> **2. Which path?** Which flows/components does it travel (the finding should name `DF-xx`/`AI-xx`)?

> **3. Which defense defeats THIS path?** Not "a guardrail" — the specific one at the specific point (see Lesson 08).

---

> [!risk] **What can go wrong?** A few categories dominate real incidents — recognize them in your own stack:
> - **LLM01** injection: every LLM app that accepts text or retrieves content — the default assumption is *yes, it can be injected*.
> - **LLM05** improper output: every place model output flows into a renderer, SQL, a shell, or another system without validation.
> - **LLM06** excessive agency: every agent with a tool it didn't strictly need.
> - **LLM04 + LLM08** poisoning & vector weaknesses: every RAG/retrieval system where the store accepts content with weak provenance.
> - **LLM02/L07/L09** disclosure & prompt leakage: everywhere internal config or user data reaches the context window.
> - **LLM10** unbounded consumption: every agent/autonomous pattern without budgets and loop breakers.

> [!fix] **What can we do about it?** The category names the fix family — apply it on the *path*, not in the air:
> - Injection: isolate instructions from data; validate retrieved content; never trust raw model output.
> - Disclosure: minimize what enters context; redact PII at boundaries; keep system prompts free of secrets.
> - Agency: least-privilege tools, scoped autonomy, HITL on consequential actions.
> - Poisoning: strict ingestion provenance and validation before indexing.
> - Output handling: escape/validate model output at every consumer — the model is not a safe renderer.
> - Consumption: token budgets, timeouts, loop breakers, cost gates — enforced mechanically, not via a prompt.

## In the tool

1. Open `patterns/rag-genai.md` (it ships in the project) and read its **Pre-Mapped Threat Catalog** table.
2. Notice how each row is `LLM0x | AML.Txxx | component IDs | attack vector`. That one table is the skeleton of the report the tool generates.
3. Run the **RAG GenAI** sample. In the report, find the threat/risk section and confirm every `LLM0x` in it traces back to a row in the pre-mapped catalog.

## Hands-on exercise

> [!exercise] **Spot the category (and be wrong, then be right)**
> 1. Before you look at anything, match each of these **to one LLM0x and one component** — justify it aloud:
>    a. A malicious PDF indexed into the knowledge base changes every future answer.
>    b. The agent uses a *delete* API it was provisioned but never needed.
>    c. A user trickles prompts until the model reproduces its system instructions.
>    d. The RAG app renders the model's HTML output unescaped in the UI.
>    e. A bot answers with another customer's account balance.
>    f. An autonomous agent loops forever calling a paid API.
> 2. Now run/most-relevant sample and check each choice against the generated findings. Where you were wrong, find the *component* on the path that explains the correct placement.
> 3. **Blind-spot test:** the catalog has an `LLM` row with `—` in the ATLAS column, and ATLAS rows with `—` in the LLM column. Name one threat that would appear only on the ATLAS rows and explain what the LLM list misses about it.

## Checkpoints

1. LLM01 has two flavors — name both and say which one usually comes *from data, not the user*.
2. Distinguish LLM06 (Excessive Agency) from LLM05 (Improper Output Handling) with one example each.
3. Which failure mode is a *cost/exhaustion* DoS, and what flow does it attack?
4. Why is "misinformation/overreliance" a threat the *architecture* can address even though it's a model property?

## Quick check

> [!quiz]
> 1. LLM01 Prompt Injection has two flavors — which are they?
> - A) Direct and indirect
> - B) Data and model
> - C) Input and output
> - D) Training and inference
> Answer: A
> 2. An agent deletes data using a delete API it was provisioned but never needed. Which category is this?
> - A) LLM01 Prompt Injection
> - B) LLM05 Improper Output Handling
> - C) LLM06 Excessive Agency
> - D) LLM10 Unbounded Consumption
> Answer: C
> 3. Which category is a cost / exhaustion denial-of-service?
> - A) LLM02 Sensitive Information Disclosure
> - B) LLM09 Misinformation
> - C) LLM10 Unbounded Consumption
> - D) LLM03 Supply Chain
> Answer: C

## Key takeaways

- Ten categories: injection, disclosure, supply chain, poisoning, output handling, agency, prompt leakage, vector weaknesses, misinformation, unbounded consumption.
- Categories aren't attacks — map each to a concrete path (flows + components).
- The tool's catalogs pair every `LLM0x` with an `AML.T` technique; that's your two-axis view.
- LLM list ≠ complete: ATLAS picks up what the LLM list misses.

## Where to next

Now the second axis — the adversary's actual playbook: **Lesson 06 — MITRE ATLAS**.