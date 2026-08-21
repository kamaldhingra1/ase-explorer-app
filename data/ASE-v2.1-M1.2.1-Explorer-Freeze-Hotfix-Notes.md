# ASE v2.1 M1.2.1 - Explorer Freeze Hotfix

## Required deployment
Replace only:
- `js/simpilot.js`

## Keep deployed
- `whats-next.html`
- `data/copilot-paths.json`

## Fix
This hotfix restores the last known-good Adaptive Simpilot runtime and removes the M1.2 DOM-wide collision observer enhancements that caused ASE3 to become unresponsive during the Start Exploring screen.

The What's Next page remains available. Collision-aware docking, automatic roadmap-nav injection, and automatic Incident Library note injection are temporarily rolled back for a safer implementation in the next patch.
