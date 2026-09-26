---
title: OWASP Agentic AI Top 10
module: Pattern Deep Dives
minutes: 45
level: Advanced
status: complete
---

# OWASP Agentic AI Top 10

> OWASP released the **Top 10 for Agentic Applications (2026 edition)** as the agent-specific successor to the LLM Top 10, this time with a distinct ID scheme — `ASI01`–`ASI10`. Where the LLM list covers *a model answering*, this list covers *a system being given tools, memory, and the ability to act*.

If you've done Lesson 05 - OWASP LLM Top 10, you already know half the map — **ASI02 Tool Misuse & Exploitation** and **ASI05 Unexpected Code Execution** are the agentic faces of `LLM03` Excessive Agency and `LLM10` Improper Output Handling. The entries that are new are the ones that only exist when software takes actions: goal hijack, cascading failures, memory/context poisoning, inter-agent trust, and the hegemony of who-is-this-acting-for.

> The list is your **agentic threat prompt list**: nothing on it is a finding by itself — it becomes a finding when you can point at a path (component + flow) and say "this is where ASI07 happens."

## Why this matters

The AI agent patterns in your tool (Single-Agent, Multi-agent, Autonomous-agent and MCP ) share one property: the system's outputs *do things in the world*. That property is exactly what the ten agentic failure modes exist to name. When a report on an agent pattern flags something new, it is usually one of these ten — even when the underlying tech was described more comfortably as a prompt-injection or an output-handling bug. Knowing the agentic list means you can *name* the failure precisely, which is the difference between "the agent did something weird" and "ASI08: cascading failure on the backup agent's delete flow."

> [!callout] **Two eras — keep this mapping handy**
> The early 2025 preview of this list used plain `A1`–`A10` IDs; the 2026 release is **`ASI01`–`ASI10`** with some categories split, renamed, or absorbed (e.g. "excessive agency" now reads as *tool misuse* + *identity abuse*). Older catalogs, decks, and reports may still carry the A-IDs — translate, then judge:

| 2025 draft (A-IDs) | 2026 release (ASI-IDs) | 2026 category |
|--------------------|------------------------|---------------|
| A3 Improper Input Handling | **ASI01** | Agent Goal Hijack |
| A2 Excessive Agency | **ASI02** (+ ASI03) | Tool Misuse & Exploitation |
| A10 Identity Spoofing | **ASI03** | Identity & Privilege Abuse |
| — (new) | **ASI04** | Agentic Supply Chain Vulnerabilities |
| A9 Improper Output Handling | **ASI05** | Unexpected Code Execution |
| A7 Unsafe Data Handling | **ASI06** | Memory & Context Poisoning |
| A8 Insecure Communication | **ASI07** | Insecure Inter-agent Communication |
| A1 + A4 + A5 (loops/consumption/hallucinations) | **ASI08** | Cascading Failures |
| A6 Inadequate Human Oversight | **ASI09** | Human–Agent Trust Exploitation |
| — (new) | **ASI10** | Rogue Agents |

## The ten failure modes

![OWASP Agentic AI Top 10](images/top-agentic-10.png)

| ID | Category | What it is | Where it bites in practice |
|----|----------|-----------|----------------------------|
| **ASI01** | **Agent Goal Hijack** | An attacker redirects the agent's goals or plans through injected instructions or poisoned content | A crafted web page steers a research agent; tool output overwrites its subgoals |
| **ASI02** | **Tool Misuse & Exploitation** | Legitimate tools abused through unsafe chaining, ambiguous instructions, or manipulated tool outputs | A read-only copilot tricked into delete calls; poisoned tool descriptors |
| **ASI03** | **Identity & Privilege Abuse** | Delegated trust, inherited credentials, and role chains exploited to act beyond authority | "Pretend you're the audit agent" — an action attributed to the wrong principal |
| **ASI04** | **Agentic Supply Chain Vulnerabilities** | Compromised or tampered third-party agents, tools, plugins, registries, or update channels | A malicious MCP server, a backdoored plugin in the skill registry |
| **ASI05** | **Unexpected Code Execution** | Agent-generated or agent-invoked code turns into unintended execution, compromise, or escape | A sandboxed code runner breached; a generated shell script executes on the host |
| **ASI06** | **Memory & Context Poisoning** | Corrupting stored context (memory, embeddings, RAG stores) to bias future reasoning and actions | Tenant A's document pollutes a shared vector store; poisoned long-term memory |
| **ASI07** | **Insecure Inter-agent Communication** | Agent-to-agent messages are spoofed, intercepted, or manipulated due to weak authentication/integrity | A forged message on the agent bus triggers a downstream destructive action |
| **ASI08** | **Cascading Failures** | A single fault propagates across agents, tools, and workflows into system-wide impact | A broker agent passes a hallucinated ID → orchestrator → sub-agent → persisted state |
| **ASI09** | **Human–Agent Trust Exploitation** | Abusing user trust and authority bias to get unsafe approvals or extract information | "Click Approve to continue" rubber-stamping; an agent asking a user to confirm an exfiltration |
| **ASI10** | **Rogue Agents** | Agents drift or are compromised and act harmfully beyond their intended scope | A jailbroken agent operating outside its deployment intent with live credentials |

> [!callout] **Same league, different game: LLM Top 10 vs Agentic Top 10**
> The Agentic list is not the LLM list renamed. Overlap exists — **ASI02/ASI03** carry agency-and-privilege, **ASI05** is the agentic "improper output", **ASI06** is poisoning for stored *memory*. The additions — **ASI01** (goal hijack), **ASI08** (error compounding across calls), **ASI07** (the data chain), **ASI09** (the human in the loop), **ASI10** (drift) — are all *architectural*, not model properties. That's the tell: if a mitigation lives in the component and flow structure (not in the prompt), you're solving an agentic problem. Lesson 07- AI STRIDE gives you the STRIDE vocabulary for these; Lesson 08 the control families; 12a the tool-identity angle.

---


## Reading strategy in a report

When you see an agentic finding, answer four questions—one more than the LLM list asks:

> **1. Which mode?** (ASI01–ASI10)  
    **-->** say it out loud; "tool misuse" and "identity abuse" sound alike until you point at the component.

> **2. Where did the chain get the bad input?**  
    **-->** The agentic list is about *paths*, so: which flow (`DF-xx`/`AI-xx`) and which hop (planner, memory, tool, message bus) carries it?

> **3. At which hop does a control stop it?**  
    **-->** Termination, least privilege, human approval, identity on the message, or output validation — name the component.

> **4. Who was acting, and can we prove it?**  
    **-->** If the answer isn't a principal with an authenticated identity, that's ASI03 or ASI07 knocking.

---

> [!risk] **What can go wrong?** The incidents that make the agentic news cycle, mapped to their IDs:
> - **ASI01** goal hijack: every agent that consumes tool output, web content, or long-term memory — assume it can be steered.
> - **ASI02 + ASI09** misuse without safeguards: the pattern that keeps the industry in headlines — "the agent did X and the human approved it because it asked nicely."
> - **ASI08** the cascade: one wrong fact becomes ten; the damage scale is a chain, not a token.
> - **ASI06** poisoned memory: shared memory and unvalidated ingestion turn a single tenant's bug into everyone's seam.
> - **ASI04** the supply chain: MCP servers, plugins, and skills are the new third-party risk.
> - **ASI10** the silent hang: a rogue agent that never finishes may be worse than one that fails loud — no signal, no bill, just nothing.

> [!fix] **What can we do about it?** Control families that stop the agentic list (all live in Lesson 08, 10a, 12a):
> - **ASI08/ASI10**: hard termination — max steps, timeouts, loop breakers, token & cost budgets enforced mechanically, not by prompt; quarantine on behavioral drift.
> - **ASI02/ASI03**: least-privilege tool scopes, capability allow-lists, read-only defaults; ephemeral scoped identities; revoke what isn't needed for THIS task.
> - **ASI01/ASI05**: boundaries between instructions and data; schema/allow-list validated tool calls; sandboxed (gVisor/Firecracker) code execution; treat tool output as untrusted input.
> - **ASI09**: HITL approval gates with *context you can't rubber-stamp*, stop conditions, always-available abort.
> - **ASI06**: per-tenant memory isolation, ingestion provenance, minimised context.
> - **ASI07/ASI04**: authenticated identities on every participant and message, provenance tracking, mTLS between agent hops, registry signing for skills/plugins.

## In the tool

1. Open Autonomous-agent and read its **Pre-Mapped Threat Catalog** — notice the agentic rows carry the ATLAS technique (`AML.T0043: staging for attack`, `AML.T0047: semantic conflation`…) and an `AI-xx` component ID.
2. Run the **Autonomous Agent** sample. In the report, find the threats that are *agentic* (no clean `LLM0x` mapping — they live in ASI territory) and trace each to the component on the path.
3. Compare a **Single Agent** report with the **Multi-Agent** report — the ASI07/ASI08 findings should multiply with the number of hops. If they don't, your group model is hiding a data-chain risk.
4. **Edition check:** catalogs in existing pattern files may still carry the 2025 draft `A1`–`A10` IDs — translate each with the table above and mark it for refresh.

## Hands-on exercise

> [!exercise] **Name the mode, place the control**
> 1. For each scenario, answer **mode (ASI01–ASI10) → path (flows/components) → one control that stops it at the right hop**:
>    a. Two agents call each other, each waiting for the other's result — a cascade forms.
>    b. A research agent is prompted via a web page to "retrieve and then forget the customer list" and forwards it out.
>    c. An agent merges a PR after the user blindly clicks "Approve"; the merge breaks production.
>    d. One sub-agent fabricates an ID; the orchestrator builds three downstream calls on it.
>    e. Tenant B's agent reads Tenant A's records from shared long-term memory.
> 2. Run the **Multi-Agent** sample and check where the tool lands these categories; where it can't (the catalog has no row), note it as a blind spot and name the ATLAS technique that tracks it.
> 3. **Blind-spot test:** the LLM list has nothing for *goal hijack* or *cross-tenant memory poisoning*. Write one ASI01 row and one ASI06 row in your own words with the component IDs you'd attach.

## Checkpoints

1. Which entries carry over from the LLM list, and what makes the agentic versions worse?
2. ASI08 (cascading failures) and ASI10 (rogue agents) sound similar — what distinguishes "one fault propagates" from "the agent itself has drifted"?
3. Why is ASI06 (memory & context poisoning) an *architecture* problem, not just a model problem?
4. ASI07 insecure inter-agent communication — what single technical control on the data chain makes it tractable in a multi-agent topology?

## Quick check

> [!quiz]
> 1. A compromised plugin in the skill registry installs hidden instructions into every agent that loads it. Which mode?
> - A) ASI04 Agentic Supply Chain Vulnerabilities
> - B) ASI07 Insecure Inter-agent Communication
> - C) ASI01 Agent Goal Hijack
> - D) ASI09 Human–Agent Trust Exploitation
> Answer: A
> 2. An attacker forges a message on the agent bus that causes a downstream agent to erase a database. Which mode?
> - A) ASI06 Memory & Context Poisoning
> - B) ASI07 Insecure Inter-agent Communication
> - C) ASI10 Rogue Agents
> - D) ASI02 Tool Misuse
> Answer: B
> 3. Which agentic mode is best described as "a single fault propagating across agents into system-wide impact"?
> - A) ASI01 Agent Goal Hijack
> - B) ASI03 Identity & Privilege Abuse
> - C) ASI08 Cascading Failures
> - D) ASI10 Rogue Agents
> Answer: C
> 4. A multi-agent system has no authenticated identity on messages between agents. What does the data chain need first?
> - A) ASI08 circuit breakers on the orchestrator
> - B) ASI09 a human approval gate
> - C) ASI07 authenticated principals + mTLS and provenance on each message
> - D) ASI06 memory isolation per tenant
> Answer: C

## Key takeaways

- OWASP Agentic Top 10 2026: **ASI01–ASI10** — the agent-specific successor to the LLM list.
- Partial overlap with LLM ground; the rest (goal hijack, supply chain, cascades, inter-agent comms, trust exploitation, rogues) only exists when software acts.
- Agentic failures live in components and flows, not in prompts — that's where the controls go.
- Goal integrity, least privilege, sandboxing, oversight, tenancy, communication trust, and termination are the fixes that cover the list.

## Where to next

You now have both catalogues — LLM and agentic. Next: **Lesson 12d — Mapping Agentic Intersections & Exploit Paths** shows how these ten chain into multi-stage attacks, then **Lesson 13 — Writing the Threat Report**.