# AI Security Threat Modeling Training — Course Plan

Hands-on curriculum that turns the AI Threat Modeler into a teaching tool: explain how
AI systems work, play with the sample diagrams, and generate real threats, risks and
mitigations to learn how to threat-model and secure AI systems.

Course root: `training/` (served at `GET /training`). The training app is completely
separate from the TM service — no changes to `app/`, `static/` or job behavior.

## Learning model

Each lesson follows the same **hands-on-first** loop:

1. **Try** — a short hands-on exercise using the sample diagrams (predict threats before
   you read anything).
2. **Learn** — a concise explainer (concepts, frameworks, real examples).
3. **Play** — run the sample through the Threat Modeler and compare the report against
   your predictions (reveal the "answer key").
4. **Check** — checkpoint questions + a fill-in worksheet (paper or copy into the tool).
5. **Apply** — modify the sample (add a component, remove a control) and re-run to see how
   the findings change.

These map to the tool's existing assets: `samples/*.png` are the exercises,
`patterns/*.md` pre-mapped catalogs are the answer keys.

## Visuals and recurring callouts (throughout every lesson)

- **Concept diagrams** (`lessons/images/*.png`, sources in `diagrams/*.mmd`,
  regenerate with `sh render-diagrams.sh` from the container): five-step loop (01),
  four-questions cycle (02), trust zones/flows (03), component taxonomy (04),
  ATLAS tactics chain (06), defense-in-depth layers (08). OWASP Top 10 (05) and
  STRIDE (07) are intentionally table/worksheet-driven.
- **`[!risk]` — "What can go wrong?"** boxes: named failure modes for the topic.
- **`[!fix]` — "What can we do about it?"** boxes: architectural enforcement points.
- Rendered by `training/index.html` (small offline markdown renderer; images resolve
  relative to each lesson file).

## Curriculum map (end-to-end)

| # | Lesson | Module | Status | Core learning |
|---|--------|--------|--------|---------------|
| 01 | Threat Modeling Primer | Foundations | ✅ ready | What/why, the 5-step process, model types |
| 02 | The Four Questions | Foundations | ✅ ready | Shostack's four: what are we working on / what can go wrong / what will we do / did we do a good job |
| 03 | Trust Zones & Data Flows | Foundations | ✅ ready | Zones, boundaries, flows = attack surface |
| 04 | AI Components & Attack Surface | Foundations | ✅ ready | Requester/service/LLM/tool/store/guardrail roles, AI-01…AI-16 inventory style |
| 05 | OWASP LLM Top 10 | Foundations | ✅ ready | The 10 categories with AI examples + pattern mapping |
| 06 | MITRE ATLAS | Foundations | ✅ ready | ATLAS matrix, key techniques, AML IDs used in reports |
| 07 | AI-Augmented STRIDE | Foundations | ✅ ready | STRIDE + AI-specific threat kinds |
| 08 | Mitigations & Controls for AI | Foundations | ✅ ready | Defense types, prompt-is-not-a-control principle |
| 09 | Deep Dive: RAG GenAI | Pattern Deep Dives | ✅ ready | rag-genai catalog walk-through, exercise, report review |
| 10 | Deep Dive: Single Agent | Pattern Deep Dives | ✅ ready | agency, tools, memory, HITL |
| 11 | Deep Dive: Multi-Agent | Pattern Deep Dives | ✅ ready | inter-agent injection, collusion, shared state |
| 12 | Deep Dive: Autonomous Agent | Pattern Deep Dives | ✅ ready | escalation, self-modification, kill switch |
| 13 | Writing the Threat Report | Wrap-Up | ✅ ready | Evidence-based findings, risk ratings, mitigations |
| 14 | Governance & Handoff | Wrap-Up | ✅ ready | PR/legal/compliance review, remediation owners |

## Per-lesson template

Every lesson `.md` uses frontmatter for the sidebar, then:
`Why this matters` / `Core concepts` / `In the tool` (hands-on steps) / `Hands-on exercise`
(predict-then-reveal + worksheet) / `Checkpoints` / `Key takeaways` / `Where to next`.

## Foundation lessons — detail specs

- **01 Primer**: the 5-step loop (scope → model in components/flows → identify threats →
  rate risk → plan mitigations); CIA + non-functional properties; why AI changes STRIDE.
- **02 Four Questions**: Shostack's what-are-we-working-on / what-can-go-wrong /
  what-will-we-do / did-we-do-a-good-job; Q1 is the map, frameworks feed Q2, Q3 is
  decisions with owners, Q4 keeps the loop honest.
- **03 Trust Zones**: UNTRUSTED / EDGE / INTERNAL / EXTERNAL zones (as used in the
  reports' component inventories); how data flows cross boundaries; drawing boundaries
  on a sample diagram before running the tool.
- **04 Components**: role taxonomy (UI, gateway, guardrails, orchestrator, service,
  model/lab, store, tool, HITL, monitor) and why component assignment drives findings;
  introduces the AI-## inventory convention.
- **05 OWASP LLM Top 10**: LLM01–LLM10 (prompt injection, sensitive information
  disclosure, supply chain, DoS, insecure plugin design, excessive agency, insecure
  output handling, training data poisoning, system prompt leakage, model theft /
  overreliance nuance as of current OWASP edition); AI examples for each; which patterns
  they commonly appear in.
- **06 ATLAS**: matrix orientation; collects AML.T0051 variants (prompt
  injection), T0054 (excessive agency / collusion / goal hijacking), T0020 (poisoning),
  T0024 (exfiltration), T0010 (supply chain), T0043 (DoS), T0025 (model extraction);
  shows how to read AML IDs out of a report.
- **07 AI STRIDE**: classic STRIDE + AI-specific augments (non-determinism, hallucination,
  prompt injection as spoofing or tampering, distillation attack, poisoning, model theft,
  accountability/repudiation for model outputs); STRIDE worksheet per pattern.
- **08 Mitigations**: isolation, validation, least privilege, monitoring, HITL, kill
  switch; "prompt guardrails are not a control" — architectural enforcement; defense in
  depth layered per component and trust boundary.

## Deep dives (09–12)

- **09 RAG**: catalog walk (indirect/direct injection, index poisoning, disclosure via
  memory, supply chain, DoS, retrieval manipulation, overreliance, model extraction,
  prompt leakage); the two flows (`DF-07` confidentiality line, `DF-12` backdoor).
- **10 Single Agent**: tool registry right-sizing, observation sanitization, memory write
  gating, Goal Manager as a fence, architecture-level `AI-11`.
- **11 Multi-Agent**: message-bus auth, per-agent least privilege, shared-state isolation,
  veto-capable coordinator, `AML.T0051.006`/`.007`/`.003`.
- **12 Autonomous Agent**: the five non-negotiables (enforced envelope, bounded
  reflection, independent HITL + kill switch, observation sanitization, fail-safe
  defaults); `AML.T0054.004`–`.007`.

## Wrap-up (13–14)

- **13 Report writing**: findings → evidence → impact/likelihood → risk rating → fix
  owners; how to present to engineering vs leadership.
- **14 Governance**: IR review, compliance crosswalk (EU AI Act, NIST AI RMF,
  FDA/GxP for medical), SAR, incident response for AI, model cards/registry.
- **Trainer guide**: session plans (90-min and half-day), slide outlines, printable
  worksheets, answer keys, discussion prompts.

## Next (product backlog, not yet built)

- Annotate-and-export on top of a generated report (learner deliverable).
- Printable worksheet generator (STRIDE sheets, catalogs).
- Lesson authoring: simple frontmatter + markdown — no app changes needed.

> **Built:** Quiz/assessment mode with completion tracking (3-question quick check per
> lesson, pass at ≥50%, progress bar in sidebar + header, `localStorage` persistence,
> "✓ Mark complete") and the spoil guard (mitigations hidden behind an answer key until
> the lesson's quiz is passed or the reveal button is clicked).

## How to add/modify a lesson

1. Create or edit `training/lessons/<NN>-<slug>.md` (frontmatter:
   `title`, `module`, `minutes`, `level`, `status`).
2. Add/update the entry in the `MANIFEST` list inside `training/index.html`.
3. Reload `/training`. No rebuild required (folder is mounted into the container).

## Development notes

- `/training` is served by `app.main` via `StaticFiles(directory=CONFIG.training_dir,
  html=True)` — a pure mount, zero effect on existing routes.
- `docker-compose.yml` mounts `./training:/opt/ai-tm/training` so content updates are live.
- The page is self-contained: custom markdown renderer, no CDN, offline-safe.