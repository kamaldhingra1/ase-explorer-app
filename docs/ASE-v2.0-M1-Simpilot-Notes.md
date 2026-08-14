# ASE v2.0 M1 - Simpilot First Cut

## Scope

Simpilot M1 introduces a persistent, bottom-right, collapsible Security Guide across ASE pages.

## Highlights

- Uses the existing ASE shield icon as the Simpilot identity.
- Adds a subtle amber living-glow treatment with a breathing status indicator.
- Adds a collapsible drawer, not a chatbot-style bubble.
- Provides quick guidance chips: Explain Risk, Recommend Controls, Business Impact, and Incident Chain.
- Adds page and Explorer context awareness using local DOM signals.
- Runs fully in the browser with local JSON guidance files. No API calls, no backend, and no LLM required.

## Files to deploy

Required:

- `css/main.css`
- `js/ask-ase.js`
- `js/simpilot.js`
- `data/copilot-playbooks.json`
- `data/copilot-intents.json`

Optional:

- `docs/ASE-v2.0-M1-Simpilot-Notes.md`
