---
title: OWASP Agentic AI Top 10
module: Pattern Deep Dives
minutes: 45
level: Advanced
status: complete
---

# OWASP Agentic AI Top 10

> OWASP released the **Agentic AI Top 10** in 2025 as the agent-specific successor to the LLM Top 10. Where the LLM list covers *a model answering*, this list covers *a system being given tools, memory, and the ability to act*. Plan AI agents need the extra scope and expectations around, that your libraries, controllers, and interfaces have around the agent agent top ten.
: If you've done Lesson 05, you already know half the map — **A2 Excessive Agency** and **A9 Improper Output Handling** rename problems you've met as `LLM06` and `LLM05`. The new entries are the ones that only exist when software takes actions: unbounded execution, cascading failures, oversight, and the sprawl of who-is-this-acting-for.
>: The list is your **agentic threat prompt list**: nothing on it is a finding by itself — it becomes a finding when you can point at a path (component + flow) and say "this is where A5 happens."

## Why this matters

The AI agent patterns in your tool (`10-single-agent`, `11-multi-agent`, `12-autonomous-agent`, `12a-mcp`) share one property: the system's outputs *do things in the world*. That property is exactly what the ten agentic failure modes exist to name. When a report on an agent pattern flags something new, it is usually one of these ten — even when the underlying tech was described more comfortably as a prompt-injection or an output-handling bug. Knowing the agentic list means you can *name* the failure precisely, which is the difference between "the agent did something weird" and "A6: no stop condition on the backup agent's delete flow."

## The ten failure modes

![OWASP Agenti AI Top 10](images/top-agentic-10.png)

| ID | Category | What it is | Where it bites in practice |
|----|----------|-----------|----------------------------|
| **A1** | **Unbounded Execution** | The agent has no hard stop: runaway loops, endless task spawning, silent non-termination | A task agent re-planning forever, a chain that recurses instead of finishing, a handler that never returns a final answer |
| **A2** | **Excessive Agency** | The agent is granted tools, scopes, or permissions beyond what the task requires | A read-only copilot holding a delete API and a write DB (the old `LLM06`, now with real teeth) |
| **A3** | **Improper Input Handling** | Agent inputs are trusted, so instructions (direct, indirect, or hidden in tool output/memory) control the agent | Another tool's output feeding the planner as if it were the task, a crafted web page steering a research agent |
| **A4** | **Infinite Loops / Denial of Wallet** | Work loops without boundary, multiplying tool calls and cost until the budget is gone | Two agents calling each other, retry storms against a flaky API, cost-per-token burning through a credit |
| **A5** | **Cascading Hallucinations** | An early wrong output propagates and compounds through the chain — each stage builds on fabricated prior truth | A broker agent passes a hallucinated ID to orchestrator → sub-agent → MCP call → persisted state |
| **A6** | **Inadequate Human Oversight** | No control point, stop condition, or intervention path exists between agent action and consequence | An autonomous agent moving money or merging a PR with nobody able to press stop |
| **A7** | **Unsafe Data Handling** | Memory, context, or tool payloads mix tenants, permissions, or sensitive material without boundary enforcement | Shared memory leaking tenant A's records into tenant B's agent, secrets riding in context |
| **A8** | **Insecure Communication / Data Chain** | Agent-to-agent, agent-to-tool, and agent-to-user messages are unauthenticated/unmonitored; provenance is untracked | A downstream agent trusts a message from anywhere, spoofed tool output treated as ground truth |
| **A9** | **Improper Output Handling** | Agent outputs are consumed by other systems as code, commands, or privileged instructions without validation | Agent output routed to a terminal, a sandbox bypass, or another agent's system prompt verbatim |
| **A10** | **Identity Spoofing** | Participants (agent, tool, user, task) can be impersonated; there's no strong identity on actions | "Pretend you're the audit agent" — an action attributed to the wrong principal, poisoning trust |

> [!callout] **Same league, different game: LLM Top 10 vs Agentic Top 10**
> The Agentic list is not the LLM list renamed. Overlap (A2←→LLM06, A9←→LLM05, A4↔LLM10) covers the *model* failure modes. The agentic additions — **A1** (no termination), **A5** (error compounding across calls), **A7** (shared memory/tenancy), **A8** (the data chain), **A10** (identity) — are all *architectural*, not model properties. That's the tell: if a mitigation lives in the component and flow structure (not in the prompt), you're solving an agentic problem. Lesson 07 gives you the STRIDE vocabulary for these; Lesson 08 the control families; 12a the tool-identity angle.

![OWASP Agenti AI Top 10](images/top-agentic-10-flow.png)

## Reading strategy in a report

When you see an agentic finding, answer three questions—one more than the LLM list asks:

> **1. Which mode?** (A1–A10) — say it out loud; "unbounded execution" and "excessive agency" sound alike until you point at the component.

> **2. Where did the chain get the bad input?** The agentic list is about *paths*, so: which flow (`DF-xx`/`AI-xx`) and which hop (planner, memory, tool, message bus) carries it?

> **3. At which hop does a control stop it?** Termination, least privilege, human approval, identity on the message, or output validation — name the component.

> **4. Who was acting, and can we prove it?** If the answer isn't a principal with an authenticated identity, that's A10 knocking.

---

> [!risk] **What can go wrong?** The incidents that make the agentic news cycle, mapped to their IDs:
> - **A3** input handling: every agent that consumes tool output, web content, or long-term memory — assume it can be steered.
> - **A2 + A6** agency without oversight: the pattern that keeps the industry in headlines — "the agent did X and nobody could stop it or say no."
> - **A4** the cost kill: loops and retry storms aren't exotic; they're the default failure of *unbounded* work.
> - **A5** compounding error: one wrong fact becomes ten; the damage scale is a chain, not a token.
> - **A7 + A8** tenancy and trust: shared memory and untracked provenance turn a single tenant's bug into everyone's seam.
> - **A1** the silent hang: an agent that never finishes may be worse than one that fails loud — no signal, no bill, just nothing.

> [!fix] **What can we do about it?** Control families that stop the agentic list (all live in Lesson 08, 10a, 12a):
> - **A1/A4**: hard termination — max steps, timeouts, loop breakers, token & cost budgets enforced mechanically, not by prompt.
> - **A2**: least-privilege tool scopes, capability allow-lists, read-only defaults; revoke what isn't needed for THIS task.
> - **A3/A9**: boundaries between instructions and data; validate at every consumer; treat tool output as untrusted input.
> - **A6**: HITL approval gates on consequential actions, stop conditions, and an always-available abort.
> - **A7**: per-tenant memory isolation, minimised context, secrets handled out-of-band.
> - **A8/A10**: authenticated identities on every participant and message, provenance tracking on the data chain, mTLS between agent hops.

## In the tool

1. Open `patterns/autonomous-agent.md` and read its **Pre-Mapped Threat Catalog** — notice the agentic rows carry the ATLAS technique (`AML.T0043: staging for attack`, `AML.T0047: semantic conflabs`…) and an `AI-xx` component ID rather than an `LLM0x`.
2. Run the **Autonomous Agent** sample. In the report, find the threats that are *agentic* (no clean `LLM0x` mapping — they map to A1/A5/A8/A10 territory) and trace each to the component on the path.
3. Compare a **Single Agent** report with the **Multi-Agent** report — the A5/A8 findings should multiply with the number of hops. If they don't, your group model is hiding a data-chain risk.

## Hands-on exercise

> [!exercise] **Name the mode, place the control**
> 1. For each scenario, answer **mode (A1–A10) → path (flows/components) → one control that stops it at the right hop**:
>    a. Two agents call each other, each waiting for the other's result.
>    b. A research agent is prompted via a web page to "retrieve and then forget the customer list" and forwards it out.
>    c. An agent merges a PR with no human approval point; the merge breaks production.
>    d. One sub-agent fabricates an ID; the orchestrator builds three downstream calls on it.
>    e. Tenant B's agent reads Tenant A's records from shared long-term memory.
> 2. Run the **Multi-Agent** sample and check where the tool lands these categories; where it can't (the catalog has no row), note it as a blind spot and name the ATLAS technique that tracks it.
> 3. **Blind-spot test:** the LLM list has nothing for *silent non-termination* or *cross-tenant memory*. Write one A1 row and one A7 row in your own words with the component IDs you'd attach.

## Checkpoints

1. Which two modes are "old friends" renamed from the LLM list, and what makes the agentic versions worse?
2. A1 and A4 both involve loops — what distinguishes "unbounded execution" from "infinite loops / denial of wallet"?
3. Why is A5 (cascading hallucinations) an *architecture* problem, not just a model problem?
4. A10 identity spoofing — what single technical control on the data chain makes it tractable in a multi-agent topology?

## Quick check

> [!quiz]
> 1. An agent has no max steps and silently re-plans forever. Which mode?
> - A) A1 Unbounded Execution
> - B) A2 Excessive Agency
> - C) A4 Infinite Loops
> - D) A5 Cascading Hallucinations
> Answer: A
> 2. Which agentic mode is best described as "error compounding across chain hops"?
> - A) A3 Improper Input Handling
> - B) A5 Cascading Hallucinations
> - C) A8 Insecure Data Chain
> - D) A10 Identity Spoofing
> Answer: B
> 3. A multi-agent system has no authenticated identity on messages between agents. What does the data chain need first?
> - A) A4 cost budgets on every hop
> - B) A6 a human approval gate
> - C) A8/A10 authenticated principals and provenance on each message
> - D) A1 termination on the orchestrator
> Answer: C
> 4. Two agents call each other, each waiting on the other — loop forever. Which pair of controls addresses it?
> - A) A1 termination + A4 budgets/loop breakers
> - B) A2 least privilege + A9 output validation
> - C) A6 HITL + A7 tenancy
> - D) A3 input validation + A10 identity
> Answer: A

## Key takeaways

- OWASP Agentic AI Top 10: A1–A10 — the agent-specific successor to the LLM list.
- Half is renamed LLM ground (A2, A9); the new half (A1, A5, A7, A8, A10) only exists when software acts.
- Agentic failures live in components and flows, not in prompts — that's where the controls go.
- Termination, least privilege, oversight, tenancy, and identity are the five fixes that cover the list.

## Where to next

You now have both catalogues — LLM and agentic — and the agent/pattern lessons that make them concrete. Next: **Lesson 13 — Writing the Threat Report** ties the collected findings into the report the tool produces.